const runCalculation = ({
  _id,
  method,
  type,
  geometries,
  charge,
  multiplicity,
  basisSet,
  functional,
}) => {
  let pythonFolder = type.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
  let pythonFileName =
    method.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`) + '.py';

  /* Start Calculation */
  console.log(`Running: Calculation #${_id}`);
  console.log(`Directory: assets/app/python/${pythonFolder}`);
  // job = spawn(
  //   'python',
  //   [
  //     pythonFileName,
  //     '--atomic-coords',
  //     geometries[0],
  //     '--basis-set',
  //     calculation.parameters.basisSet,
  //     '--functional',
  //     calculation.parameters.functional,
  //     '--charge',
  //     calculation.parameters.charge,
  //     '--multiplicity',
  //     calculation.parameters.multiplicity,
  //   ],
  //   {
  //     cwd: `assets/app/python/${pythonFolder}`,
  //   }
  // );
};

export { runCalculation };
export default runCalculation;
