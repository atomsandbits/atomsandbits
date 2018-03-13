import _ from 'lodash';

const geometryOptimizationMethods = [
  {
    value: 'machineLearning',
    prettyName: 'Machine Learning',
    type: 'geometryOptimization',
    program: 'tensormol',
  },
  {
    value: 'hartreeFock',
    prettyName: 'Hartree Fock',
    type: 'geometryOptimization',
    program: 'psi4',
  },
  {
    value: 'unrestrictedHartreeFock',
    prettyName: 'Unrestricted Hartree Fock',
    type: 'geometryOptimization',
    program: 'psi4',
  },
  {
    value: 'dft',
    prettyName: 'DFT',
    type: 'geometryOptimization',
    program: 'psi4',
  },
  {
    value: 'ccsd',
    prettyName: 'CCSD',
    type: 'geometryOptimization',
    program: 'psi4',
  },
];
const groundStateMethods = [
  {
    value: 'machineLearning',
    prettyName: 'Machine Learning',
    type: 'groundState',
    program: 'tensormol',
  },
  {
    value: 'hartreeFock',
    prettyName: 'Hartree Fock',
    type: 'groundState',
    program: 'psi4',
  },
  {
    value: 'unrestrictedHartreeFock',
    prettyName: 'Unrestricted Hartree Fock',
    type: 'groundState',
    program: 'psi4',
  },
  {
    value: 'dft',
    prettyName: 'DFT',
    type: 'groundState',
    program: 'psi4',
  },
  {
    value: 'ccsd',
    prettyName: 'CCSD',
    type: 'groundState',
    program: 'psi4',
  },
  {
    value: 'ccsdt',
    prettyName: 'CCSD(T)',
    type: 'groundState',
    program: 'psi4',
  },
];
const excitedStateMethods = [
  // {
  //   value: "geometryOptimization",
  //   prettyName: "Geometry Optimization"
  // },
  {
    value: 'tddft',
    prettyName: 'TD-DFT',
    type: 'excitedState',
    program: 'pyscf',
  },
  {
    value: 'eeccsd',
    prettyName: 'EE-CCSD',
    type: 'excitedState',
    program: 'psi4',
  },
  {
    value: 'ipccsd',
    prettyName: 'IP-CCSD',
    type: 'excitedState',
    program: 'pyscf',
  },
  {
    value: 'eaccsd',
    prettyName: 'EA-CCSD',
    type: 'excitedState',
    program: 'pyscf',
  },
];
const periodicBoundaryConditionMethods = [
  {
    value: 'hartreeFock',
    prettyName: 'Hartree Fock',
    type: 'periodicBoundaryCondition',
    program: 'pyscf',
  },
  {
    value: 'unrestrictedHartreeFock',
    prettyName: 'Unrestricted Hartree Fock',
    type: 'periodicBoundaryCondition',
    program: 'pyscf',
  },
  {
    value: 'dft',
    prettyName: 'DFT',
    type: 'periodicBoundaryCondition',
    program: 'pyscf',
  },
  {
    value: 'ccsd',
    prettyName: 'CCSD',
    type: 'periodicBoundaryCondition',
    program: 'pyscf',
  },
];

const calculationMethods = _.concat(
  geometryOptimizationMethods,
  groundStateMethods,
  excitedStateMethods,
  periodicBoundaryConditionMethods
);

export {
  calculationMethods,
  geometryOptimizationMethods,
  groundStateMethods,
  excitedStateMethods,
  periodicBoundaryConditionMethods,
};
