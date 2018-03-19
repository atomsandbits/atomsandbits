# Logging
# import logging
# logging.getLogger('requests').setLevel(logging.WARNING)
# logging.basicConfig(level=logging.DEBUG)
import os
import sys
import threading
import time
from socketIO_client import SocketIO
from TensorMol import Mol
from networks import tensormol01
from calculations import (conformer_search, energy_and_force, harmonic_spectra,
                          geometry_optimization, nudged_elastic_band)

# TODO: start tensorflow session so GPU resources get allocated


def main():
    """Entry point."""
    while True:
        try:
            calculation_running = False
            tensormol01_network = tensormol01.main()

            # SocketIO is threaded.
            # Don't run more than 1 calculation at a time at the moment.
            # TODO: handle race condition between emitting calculationRunning and
            #       receiving a new calculation
            # TODO: geomopt and energy calculations are restarting GPU resources
            #       for some reason (maybe it creates a new tf session)
            def on_run_calculation(options):
                """Run when a calculation is submitted."""
                nonlocal calculation_running
                if calculation_running:
                    return
                calculation = options.get('calculation')
                calculation_id = calculation.get('_id')
                calculation_type = calculation.get('type')
                geometries = calculation.get('geometries')
                charge = calculation.get('charge')
                multiplicity = calculation.get('multiplicity')
                network_name = calculation.get('network')
                ping_timer = None
                print('Calculation Received: ', calculation_id)

                # print(calculation)

                def ping_calculation_running(calculation):
                    nonlocal ping_timer

                    def socket_callback(error='', result=''):
                        if error:
                            print(error)
                            raise Exception('Socket Error!')
                        # print(result)

                    socket_io.emit('pingCalculationRunning',
                                   {'calculationId': calculation_id},
                                   socket_callback)
                    print('Running Calculation: ', calculation_id)
                    ping_timer = threading.Timer(1, ping_calculation_running,
                                                 [calculation])
                    ping_timer.start()

                def stop_pinging():
                    nonlocal ping_timer
                    ping_timer.cancel()

                try:
                    socket_result = {}

                    def socket_callback(error='', result=''):
                        nonlocal calculation_running
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
                        return
                    calculation_running = True
                    print('Calculation Started: ', calculation_id)
                    ping_calculation_running(calculation)

                    molecule = Mol()
                    molecule.FromXYZString(
                        str(len(geometries[0].split('\n'))) + '\n\n' +
                        geometries[0])
                    network = tensormol01_network  # add switch based on network_name
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
                        # [X]: make geomopt method return intermediate geoms and energies
                        # [x]: submit intermediate geometries and energies
                        # [X]: define a function for emitting saveIntermediateResults
                        #       after each step and pass it into geomopt method
                        def on_optimization_step_completed(mol_hist):
                            print("Emitting Callback")
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

                        finalm = geometry_optimization.main(
                            network, molecule, on_optimization_step_completed)
                        xyz = '\n'.join(str(finalm).split('\n')[2:])
                        socket_io.emit(
                            'saveCalculationResult', {
                                'calculationId': calculation_id,
                                'properties': {
                                    'geometries': [xyz],
                                    'energies': [finalm.properties['energy']]
                                }
                            })
                    elif calculation_type == 'harmonicSpectra':
                        finalm, w, v = harmonic_spectra.main(network, molecule)
                        xyz = '\n'.join(str(finalm).split('\n')[2:])
                        socket_io.emit(
                            'saveCalculationResult', {
                                'calculationId': calculation_id,
                                'properties': {
                                    'optimizedGeometry': xyz,
                                    'frequencies': w.tolist(),
                                    'intensities': v.tolist()
                                }
                            })
                    elif calculation_type == 'nudgedElasticBand':
                        # run neb
                        # values = nudged_elastic_band.main(network, [mol1, mol2])
                        pass
                    elif calculation_type == 'conformerSearch':
                        # TODO: add parameters. (window etc.)
                        nConf = calculation.get('numberOfConformers')
                        if nConf == None:
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
