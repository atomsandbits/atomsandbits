# Logging
# import logging
# logging.getLogger('requests').setLevel(logging.WARNING)
# logging.basicConfig(level=logging.DEBUG)
import os
import sys
import threading
import time
import numpy as np
from pymongo import MongoClient, CursorType, ASCENDING
from TensorMol import Mol
from networks import tensormol01
from calculations import (conformer_search, energy_and_force, harmonic_spectra,
                          geometry_optimization, nudged_elastic_band,
                          relaxed_scan)

# TODO: start tensorflow session so GPU resources get allocated

client = MongoClient('localhost', 27017)
calculation_running = False
ping_timer = None


def main():
    """Entry point."""
    while True:
        try:
            global client
            db = client.cloudszi
            Calculations = db.calculations
            Geometries = db.geometries
            Requests = db.requests

            oplog = client.local.oplog.rs
            first = oplog.find().sort('$natural', ASCENDING).limit(-1).next()
            print(first)
            ts = first['ts']

            # Observe Oplog to catch calculation requests
            while True:
                # For a regular capped collection CursorType.TAILABLE_AWAIT is the
                # only option required to create a tailable cursor. When querying the
                # oplog the oplog_replay option enables an optimization to quickly
                # find the 'ts' value we're looking for. The oplog_replay option
                # can only be used when querying the oplog.
                cursor = oplog.find(
                    {
                        'ts': {
                            '$gt': ts
                        },
                        'ns': 'cloudszi.requests',
                        'o.type': 'calculation',
                        'o.clusterId': 'free'
                    },
                    cursor_type=CursorType.TAILABLE_AWAIT,
                    oplog_replay=True)
                while cursor.alive:
                    for doc in cursor:
                        # ts = doc['ts']
                        request_id = doc['o']['_id']
                        calculation_id = doc['o']['calculationId']
                        calculation = Calculations.find_one({
                            '_id':
                            calculation_id
                        })
                        request = Requests.find_one({'_id': request_id})
                        if request and not request['completed'] and calculation and calculation['parameters']['program'] == 'tensormol':
                            print('TensorMol received Calculation #' +
                                  calculation_id)
                            global calculation_running
                            if calculation_running:
                                return
                            calculation_running = True
                            parameters = calculation.get('parameters')
                            calculation_type = parameters.get('type')
                            geometries = [
                                geometry['atomicCoords']
                                for geometry in Geometries.find({
                                    '_id': {
                                        '$in': calculation.get('geometryIds')
                                    }
                                })
                            ]
                            charge = parameters.get('charge')
                            multiplicity = parameters.get('multiplicity')
                            network_name = parameters.get('network')
                            print('TensorMol started Calculation #' + calculation_id)

                            def ping_calculation_running(calculation):
                                global ping_timer

                                current_time = int(time.time())
                                Requests.update_one({'_id': request_id}, {'$set': {'updatedAt': current_time}})
                                print('TensorMol running Calculation #' + calculation_id)
                                ping_timer = threading.Timer(
                                    1, ping_calculation_running, [calculation])
                                ping_timer.start()

                            def stop_pinging():
                                global ping_timer
                                if ping_timer:
                                    ping_timer.cancel()
                            ping_calculation_running(calculation)

                            try:
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
                                elif calculation_type == 'relaxedScan':
                                    # TODO: add parameters. (window etc.)
                                    atoms = calculation.get('atoms')
                                    final_distance = calculation.get('finalDistance')
                                    steps = calculation.get('steps')
                                    if steps == None:
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

                    # We end up here if the find() returned no documents or if the
                    # tailable cursor timed out (no new documents were added to the
                    # collection for more than 1 second).
                    time.sleep(1)

        except Exception as e:
            print('Error:', e)
            pass


if __name__ == "__main__":
    main()
