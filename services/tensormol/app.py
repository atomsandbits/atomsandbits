# Logging
# import logging
# logging.getLogger('requests').setLevel(logging.WARNING)
# logging.basicConfig(level=logging.DEBUG)
import os
# import sys
import threading
import time
# import numpy as np
from socketIO_client_nexus import SocketIO
from TensorMol import Mol
from networks import tensormol01
from calculations import (conformer_search, energy_and_force, harmonic_spectra,
                          geometry_optimization,
                          relaxed_scan)

# TODO: start tensorflow session so GPU resources get allocated

calculation_running = False
ping_timer = None


def main():
    """Entry point."""
    while True:
        try:
            tensormol01_network = tensormol01.main()

            # FYI: SocketIO is threaded.
            def on_run_calculation(options):
                """Run when a calculation is submitted."""
                print('Tensormol received ' +
                      options.get('calculation').get('_id'))
                global calculation_running
                if calculation_running:
                    return
                calculation_running = True
                calculation = options.get('calculation')
                calculation_id = calculation.get('_id')
                calculation_type = calculation.get('type')
                geometries = calculation.get('geometries')
                # charge = calculation.get('charge')
                # multiplicity = calculation.get('multiplicity')
                # network_name = calculation.get('network')
                print('Calculation Received: ', calculation_id)

                # print(calculation)

                def ping_calculation_running(calculation):
                    global ping_timer

                    def socket_callback(error='', result=''):
                        if error:
                            print(error)
                            raise Exception('Socket Error!')
                        # print(result)

                    socket_io.emit('pingCalculationRunning',
                                   {'calculationId': calculation_id},
                                   socket_callback)
                    print('Running Calculation: ', calculation_id)
                    ping_timer = threading.Timer(3, ping_calculation_running,
                                                 [calculation])
                    ping_timer.start()

                def stop_pinging():
                    global ping_timer
                    if ping_timer:
                        ping_timer.cancel()

                try:
                    socket_result = {}

                    def socket_callback(error='', result=''):
                        nonlocal socket_result
                        if error:
                            print(error)
                            raise Exception('Socket Error!')
                        socket_result = result

                    socket_io.emit('setCalculationRunning',
                                   {'calculationId': calculation_id},
                                   socket_callback)
                    socket_io.wait_for_callbacks()
                    if not socket_result.get('updated'):
                        # calculation not started, exit
                        calculation_running = False
                        return
                    print('Calculation Started: ', calculation_id)
                    ping_calculation_running(calculation)

                    molecule = Mol()
                    molecule.FromXYZString(
                        str(len(geometries[0].split('\n'))) + '\n\n' +
                        geometries[0])
                    secondary_molecule = Mol()
                    if geometries[1]:
                        secondary_molecule.FromXYZString(
                            str(len(geometries[1].split('\n'))) + '\n\n' +
                            geometries[1])
                    # add switch based on network name
                    network = tensormol01_network
                    # TODO: Attempt to run saveCalculationResult a few times on
                    #       error in callback
                    if calculation_type == 'groundState':
                        energy, force = energy_and_force.main(
                            network, molecule)
                        socket_io.emit(
                            'saveCalculationResult', {
                                'calculationId': calculation_id,
                                'properties': {
                                    'energy': energy,
                                    'force': force.tolist()
                                }
                            })
                    elif calculation_type == 'geometryOptimization':
                        firstm = None

                        def on_optimization_step_completed(mol_hist):
                            nonlocal firstm
                            print("Emitting Callback")
                            firstm = mol_hist[0]
                            energies = [firstm.properties['energy']]
                            geometries = [
                                '\n'.join(str(firstm).split('\n')[2:])
                            ]
                            if len(mol_hist) > 1:
                                for m in mol_hist[-9:]:
                                    energies.append(m.properties['energy'])
                                    geometries.append('\n'.join(
                                        str(m).split('\n')[2:]))
                            socket_io.emit(
                                'saveIntermediateCalculationResult', {
                                    'calculationId': calculation_id,
                                    'properties': {
                                        'geometries': geometries,
                                        'energies': energies
                                    }
                                })

                        finalm = geometry_optimization.main(
                            network, molecule, on_optimization_step_completed)
                        first_xyz = '\n'.join(str(firstm).split('\n')[2:])
                        final_xyz = '\n'.join(str(finalm).split('\n')[2:])
                        socket_io.emit(
                            'saveCalculationResult', {
                                'calculationId': calculation_id,
                                'properties': {
                                    'geometries': [first_xyz, final_xyz],
                                    'energies': [
                                        firstm.properties['energy'],
                                        finalm.properties['energy']
                                    ]
                                }
                            })
                    elif calculation_type == 'harmonicSpectra':
                        finalm, w, v, td = harmonic_spectra.main(
                            network, molecule)
                        xyz = '\n'.join(str(finalm).split('\n')[2:])
                        socket_io.emit(
                            'saveCalculationResult', {
                                'calculationId': calculation_id,
                                'properties': {
                                    'optimizedGeometry': xyz,
                                    'frequencies': w.tolist(),
                                    'intensities': v.tolist(),
                                    'freeEnergy': {
                                        '300K1ATM':
                                        td['Grot'] + td['Gtrans'] + td['Gvib']
                                    }
                                }
                            })
                    elif calculation_type == 'nudgedElasticBand':
                        # run neb
                        # values = nudged_elastic_band.main(
                        #     network, [mol1, mol2])
                        pass
                    elif calculation_type == 'conformerSearch':
                        # TODO: add parameters. (window etc.)
                        nConf = calculation.get('numberOfConformers')
                        if nConf is None:
                            print("Bad Conformer number: ", nConf)
                            nConf = 20

                        def on_conformer_found(mol_hist):
                            socket_io.emit(
                                'saveIntermediateCalculationResult', {
                                    'calculationId': calculation_id,
                                    'properties': {
                                        'geometries': [
                                            '\n'.join(str(m).split('\n')[2:])
                                            for m in mol_hist
                                        ],
                                        'energies': [
                                            m.properties['energy']
                                            for m in mol_hist
                                        ]
                                    }
                                })

                        mol_hist = conformer_search.main(
                            network,
                            molecule,
                            on_conformer_found,
                            n_conf=nConf)
                        socket_io.emit(
                            'saveCalculationResult', {
                                'calculationId': calculation_id,
                                'properties': {
                                    'geometries': [
                                        '\n'.join(str(m).split('\n')[2:])
                                        for m in mol_hist
                                    ],
                                    'energies':
                                    [m.properties['energy'] for m in mol_hist]
                                }
                            })
                    elif calculation_type == 'relaxedScan':
                        # TODO: add parameters. (window etc.)
                        atoms = calculation.get('atoms')
                        final_distance = calculation.get('finalDistance')
                        steps = calculation.get('steps')
                        if steps is None:
                            print("Bad steps number: ", steps)
                            steps = 20

                        def on_step(mol_hist):
                            socket_io.emit(
                                'saveIntermediateCalculationResult', {
                                    'calculationId': calculation_id,
                                    'properties': {
                                        'geometries': [
                                            '\n'.join(str(m).split('\n')[2:])
                                            for m in mol_hist
                                        ],
                                        'energies': [
                                            m.properties['energy']
                                            for m in mol_hist
                                        ],
                                        'distances': [
                                            m.properties['rs_r']
                                            for m in mol_hist
                                        ]
                                    }
                                })

                        mol_hist = relaxed_scan.main(
                            network,
                            molecule,
                            on_step,
                            steps=steps,
                            final_distance=final_distance,
                            atom_one=atoms[0],
                            atom_two=atoms[1])
                        socket_io.emit(
                            'saveCalculationResult', {
                                'calculationId': calculation_id,
                                'properties': {
                                    'geometries': [
                                        '\n'.join(str(m).split('\n')[2:])
                                        for m in mol_hist
                                    ],
                                    'energies':
                                    [m.properties['energy'] for m in mol_hist],
                                    'distances':
                                    [m.properties['rs_r'] for m in mol_hist]
                                }
                            })
                    else:
                        print('Unknown CalculationType!', calculation_type)
                except Exception as e:
                    print("Unexpected error:", e)
                    socket_io.emit(
                        'saveCalculationResult', {
                            'calculationId': calculation_id,
                            'properties': {},
                            'error': {
                                'message': str(e),
                                'createdAt': int(round(time.time() * 1000)),
                            },
                        })
                    stop_pinging()
                    calculation_running = False
                    raise
                stop_pinging()
                calculation_running = False
                print('Calculation Finished: ', calculation_id)

            # Start SocketIO Client
            address = os.environ.get('DATABASE_ADDRESS') or 'localhost'
            port = os.environ.get('DATABASE_PORT') or '8080'
            socket_io = SocketIO(
                address,
                port,
                params={
                    'program': 'tensormol',
                    'serverId': 'free'
                })
            socket_io.on('runCalculation', on_run_calculation)
            socket_io.wait()
        except Exception as e:
            print('Error:', e)
            pass


if __name__ == "__main__":
    main()
