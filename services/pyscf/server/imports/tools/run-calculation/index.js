import moment from 'moment';
import { spawn } from 'child_process';
import { socket } from '/server/imports/socket';
import { pinger } from '/server/imports/tools/pinger';

// let test = true;
const runCalculation = ({
  _id,
  method,
  type,
  geometries,
  charge,
  multiplicity,
  basisSet,
  functional,
  periodicType,
  densityFit,
  auxBasisSet,
  pseudoPotential,
  kPoints,
  latticeVectors,
}) => {
  // if (!test) return;
  // test = false;
  // type = 'groundState';
  // method = 'ccsd';
  // geometries = ['H 0 0 0\nH 1 0 0'];
  const calculationId = _id;
  pinger.start({ calculationId });
  let pythonFolder = type.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
  let pythonFileName =
    method.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`) + '.py';
  // let periodicFolder = periodicType
  //   ? '/' + periodicType.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  //   : '';

  /* Start Calculation */
  console.log(`Running: Calculation #${calculationId}`);
  console.log(`Directory: assets/app/python/${pythonFolder}`);

  // return;
  const job = spawn(
    'python',
    [
      pythonFileName,
      '--atomic-coords',
      geometries[0],
      '--basis-set',
      basisSet,
      '--functional',
      functional,
      '--charge',
      charge,
      '--multiplicity',
      multiplicity,
      /* PBC not implemented atm */
      // '--density-fit',
      // densityFit,
      // '--aux-basis-set',
      // auxBasisSet,
      // '--pseudo-potential',
      // pseudoPotential,
      // '--k-points',
      // kPoints,
      // '--lattice-vectors',
      // latticeVectors,
    ],
    {
      cwd: `assets/app/python/${pythonFolder}`,
    }
  );

  /* Create output save throttle */
  let output = '';
  let calculationError = {};
  let properties = {};
  let saveOutputThrottle = _.debounce(
    () => {
      socket.emit(
        'saveIntermediateCalculationResult',
        {
          calculationId,
          output,
          error: calculationError.createdAt ? calculationError : null,
        },
        (error, result) => {
          if (error) throw error;
        }
      );
    },
    500,
    {
      maxWait: 3000,
    }
  );
  let saveOutput = unsavedOutput => {
    // console.log(unsavedOutput);
    output += unsavedOutput;
    saveOutputThrottle();
  };

  /* Create onError callback */
  let onCalculationError = error => {
    if (!calculationError.message) {
      calculationError = {
        message: error,
        createdAt: moment().valueOf(),
      };
    }
  };

  /* Process Callbacks */
  job.stdout.on('data', data => {
    let line = data.toString() + '\n';
    saveOutput(line);
  });
  job.stderr.on('data', data => {
    let line = data.toString() + '\n';
    saveOutput(line);
    onCalculationError('stderr');
  });

  /* Calculation Errored Out */
  job.on('error', error => {
    onCalculationError(error.toString());
    socket.emit(
      'saveCalculationResult',
      {
        calculationId,
        properties,
        output,
        error: calculationError.createdAt ? calculationError : null,
      },
      (error, result) => {
        if (error) throw error;
      }
    );
    pinger.stop();
  });

  /* Calculation Finished */
  job.on('exit', (code, error) => {
    if (isNaN(code)) code = -1;
    console.log(`Finished: Calculation #${calculationId}...`);
    console.log(`Exit Code: ${code}`);

    /* Temporary Fix for Stderr problems of Psi4 */
    if (error || output.split('ERROR: ')[1]) {
      let errorMsg = error
        ? error.toString()
        : output.split('ERROR: ')[1].split('\n')[0];
      onCalculationError(errorMsg);
    }

    if (output.split('Cloudszi Properties:\n~')[1]) {
      properties = JSON.parse(
        output.split('Cloudszi Properties:\n~')[1].split('~')[0]
      );
    }
    console.log('Properties: ', properties);

    socket.emit(
      'saveCalculationResult',
      {
        calculationId,
        properties,
        output,
        error: calculationError.createdAt ? calculationError : null,
      },
      (error, result) => {
        if (error) throw error;
      }
    );
    pinger.stop();
  });

  /* TODO: Kill Process after MAX_PROCESS_TIME */
};

export { runCalculation };
export default runCalculation;
