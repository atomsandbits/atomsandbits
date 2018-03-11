# Logging
# import logging
# logging.getLogger('requests').setLevel(logging.WARNING)
# logging.basicConfig(level=logging.DEBUG)

import sys
import threading
from socketIO_client import SocketIO
from TensorMol import Mol
from networks import tensormol01
from calculations import (conformer_search, energy_and_force,
                          geometry_optimization, nudged_elastic_band)

# TODO: start tensorflow session so GPU resources get allocated


def main():
    """Entry point."""
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

        # print(calculation)

        def ping_calculation_running(calculation):
            nonlocal ping_timer

            def socket_callback(error='', result=''):
                if error:
                    print(error)
                    raise Exception('Socket Error!')
                # print(result)

            socket_io.emit('pingCalculationRunning',
                           {'calculationId': calculation_id}, socket_callback)
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
                           {'calculationId': calculation_id}, socket_callback)
            socket_io.wait_for_callbacks()
            if not socket_result.get('updated'):
                # calculation not started, exit
                return
            calculation_running = True
            print('Calculation Started: ', calculation_id)
            ping_calculation_running(calculation)

            molecule = Mol()
            molecule.FromXYZString(
                str(len(geometries[0].split('\n'))) + '\n\n' + geometries[0])
            network = tensormol01_network  # add switch based on network_name
            # TODO: Attempt to run saveCalculationResult a few times on
            #       error in callback
            if calculation_type == 'groundState':
                energy, force = energy_and_force.main(network, molecule)
                socket_io.emit(
                    'saveCalculationResult', {
                        'calculationId': calculation_id,
                        'properties': {
                            'energy': energy,
                            'force': force.tolist()
                        }
                    })
            elif calculation_type == 'geometryOptimization':
                # TODO: make geomopt method return intermediate geoms and energies
                # TODO: submit intermediate geometries and energies
                # TODO: define a function for emitting saveIntermediateResults
                #       after each step and pass it into geomopt method
                xyz = '\n'.join(
                    str(geometry_optimization.main(network,
                                                   molecule)).split('\n')[2:])
                socket_io.emit(
                    'saveCalculationResult', {
                        'calculationId': calculation_id,
                        'properties': {
                            'geometries': [xyz],
                            'energies': [0]
                        }
                    })
            elif calculation_type == 'nudgedElasticBand':
                # run neb
                # values = nudged_elastic_band.main(network, [mol1, mol2])
                pass
            elif calculation_type == 'conformerSearch':
                # run conformer search
                # values = conformer_search.main(network, molecule)
                pass
            else:
                print('Unknown CalculationType!', calculation_type)
        except:
            print("Unexpected error:", sys.exc_info()[0])
            stop_pinging()
            calculation_running = False
            raise
        stop_pinging()
        calculation_running = False
        print('Calculation Finished: ', calculation_id)

    # Start SocketIO Client
    socket_io = SocketIO(
        'localhost', 8080, params={
            'program': 'tensormol',
            'serverId': 'free'
        })
    socket_io.on('runCalculation', on_run_calculation)
    socket_io.wait()


if __name__ == "__main__":
    main()
