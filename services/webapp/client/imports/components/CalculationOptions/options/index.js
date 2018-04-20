const basisSets = [
  {
    value: 'sto-3g',
    prettyName: 'STO+3G',
  },
  {
    value: '6-31pg',
    prettyName: '6-31+G',
  },
  {
    value: '6-31pgs',
    prettyName: '6-31+G*',
  },
  {
    value: 'def2-svp',
    prettyName: 'def2-SVP',
  },
  {
    value: 'cc-pvdz',
    prettyName: 'cc-pVDZ',
  },
  {
    value: 'def2-tzvp',
    prettyName: 'def2-TZVP',
  },
  {
    value: 'cc-pvtz',
    prettyName: 'cc-pVTZ',
  },
  {
    value: 'def2-qzvp',
    prettyName: 'def2-QZVP',
  },
  {
    value: 'cc-pvqz',
    prettyName: 'cc-pVQZ',
  },
];
const functionals = [
  {
    value: 'pbe',
    prettyName: 'PBE',
  },
  {
    value: 'pbe0',
    prettyName: 'PBE0',
  },
  {
    value: 'b3lyp',
    prettyName: 'B3LYP',
  },
  {
    value: 'wB97X-D',
    prettyName: 'wB97X-D',
  },
];
const networks = [
  {
    value: 'tensormol01',
    prettyName: 'TensorMol 0.1',
    supportedElements: ['C', 'N', 'O', 'H'],
  },
];
const conformerSearchTypes = [
  {
    value: 'exhaustive',
    prettyName: 'Exhaustive',
  },
];
const types = [
  {
    value: 'groundState',
    prettyName: 'Ground State',
    supportedInputTypes: {
      geometry: {
        outputTypes: ['energy', 'force', 'geometry'],
      },
      '[geometry]': {
        outputTypes: ['[energy]', '[force]', '[geometry]'],
      },
    },
    methods: [
      {
        value: 'machineLearning',
        prettyName: 'Machine Learning',
        program: 'tensormol',
        networks,
      },
      {
        value: 'hartreeFock',
        prettyName: 'Hartree Fock',
        program: 'psi4',
        basisSets,
        charge: true,
        multiplicity: true,
      },
      {
        value: 'unrestrictedHartreeFock',
        prettyName: 'Unrestricted Hartree Fock',
        program: 'psi4',
        basisSets,
        charge: true,
        multiplicity: true,
      },
      {
        value: 'dft',
        prettyName: 'DFT',
        program: 'psi4',
        basisSets,
        functionals,
        charge: true,
        multiplicity: true,
      },
      {
        value: 'ccsd',
        prettyName: 'CCSD',
        program: 'psi4',
        basisSets,
        charge: true,
        multiplicity: true,
      },
      {
        value: 'ccsdt',
        prettyName: 'CCSD(T)',
        program: 'psi4',
        basisSets,
        charge: true,
        multiplicity: true,
      },
    ],
  },
  // {
  //   value: 'excitedState',
  //   prettyName: 'Excited State',
  //   supportedInputTypes: {
  //     geometry: {
  //       outputTypes: ['excitationEnergy'],
  //     },
  //     '[geometry]': {
  //       outputTypes: ['[excitationEnergy]'],
  //     },
  //   },
  //   methods: [
  //     {
  //       value: 'tddft',
  //       prettyName: 'TD-DFT',
  //       program: 'pyscf',
  //       basisSets,
  //       functionals,
  //       charge: true,
  //       multiplicity: true,
  //     },
  //     {
  //       value: 'eeccsd',
  //       prettyName: 'EE-CCSD',
  //       program: 'pyscf',
  //       basisSets,
  //       charge: true,
  //       multiplicity: true,
  //     },
  //     {
  //       value: 'ipccsd',
  //       prettyName: 'IP-CCSD',
  //       program: 'pyscf',
  //       basisSets,
  //       charge: true,
  //       multiplicity: true,
  //     },
  //     {
  //       value: 'eaccsd',
  //       prettyName: 'EA-CCSD',
  //       program: 'pyscf',
  //       basisSets,
  //       charge: true,
  //       multiplicity: true,
  //     },
  //   ],
  // },
  {
    value: 'geometryOptimization',
    prettyName: 'Geometry Optimization',
    supportedInputTypes: {
      geometry: {
        outputTypes: ['geometry', 'energy'],
      },
      '[geometry]': {
        outputTypes: ['[geometry]', '[energy]'],
      },
    },
    methods: [
      {
        value: 'machineLearning',
        prettyName: 'Machine Learning',
        program: 'tensormol',
        networks,
      },
      {
        value: 'hartreeFock',
        prettyName: 'Hartree Fock',
        program: 'psi4',
        basisSets,
        charge: true,
        multiplicity: true,
      },
      {
        value: 'unrestrictedHartreeFock',
        prettyName: 'Unrestricted Hartree Fock',
        program: 'psi4',
        basisSets,
        charge: true,
        multiplicity: true,
      },
      {
        value: 'dft',
        prettyName: 'DFT',
        program: 'psi4',
        basisSets,
        functionals,
        charge: true,
        multiplicity: true,
      },
      {
        value: 'ccsd',
        prettyName: 'CCSD',
        program: 'psi4',
        basisSets,
        charge: true,
        multiplicity: true,
      },
    ],
  },
  {
    value: 'conformerSearch',
    prettyName: 'Conformation Search',
    supportedInputTypes: {
      geometry: {
        outputTypes: ['[geometry]', '[energy]'],
      },
      '[geometry]': {
        outputTypes: ['[[geometry]]', '[[energy]]'],
      },
    },
    methods: [
      {
        value: 'machineLearning',
        prettyName: 'Machine Learning',
        networks,
        // conformerSearchTypes,
        numberOfConformers: true,
      },
    ],
  },
  {
    value: 'harmonicSpectra',
    prettyName: 'Harmonic Spectra',
    supportedInputTypes: {
      geometry: {
        outputTypes: ['freeEnergy', '[frequency]', '[intensity]', 'geometry'],
      },
      '[geometry]': {
        outputTypes: [
          '[freeEnergy]',
          '[[frequency]]',
          '[[intensity]]',
          '[geometry]',
        ],
      },
    },
    methods: [
      {
        value: 'machineLearning',
        prettyName: 'Machine Learning',
        networks,
      },
    ],
  },
  // {
  //   value: 'opticalSpectra',
  //   prettyName: 'Optical Spectra',
  //   supportedInputTypes: {
  //     geometry: {
  //       outputTypes: ['[frequency]', '[intensity]'],
  //     },
  //     '[geometry]': {
  //       outputTypes: ['[[frequency]]', '[[intensity]]'],
  //     },
  //   },
  //   methods: [
  //     {
  //       value: 'tddft',
  //       prettyName: 'TD-DFT',
  //       program: 'pyscf',
  //       basisSets,
  //       functionals,
  //       charge: true,
  //       multiplicity: true,
  //     },
  //   ],
  // },
];

const options = types;

export { options };
export default options;

/* ~~~ Periodic Boundary Condition ~~~ */
/*
const auxBasisSets = [
  {
    value: false,
    prettyName: 'Default',
  },
  {
    value: 'weigend',
    prettyName: 'Weigend',
  },
  {
    value: 'ahlrichs',
    prettyName: 'Ahlrichs',
  },
];
const periodicBasisSets = [
  {
    periodicBasisSet: "gthszv",
    prettyName: "GTH-SZV"
  }, {
    periodicBasisSet: "gthszvmolopt",
    prettyName: "GTH-SZV-molopt"
  }, {
    periodicBasisSet: "gthdzv",
    prettyName: "GTH-DZV"
  }, {
    periodicBasisSet: "gthdzvp",
    prettyName: "GTH-DZVP"
  }, {
    periodicBasisSet: "gthccdzvp",
    prettyName: "GTH-cc-DZVP"
  }, {
    periodicBasisSet: "gthdzvpmolopt",
    prettyName: "GTH-DZVP-molopt"
  }, {
    periodicBasisSet: "gthdzvpmoloptsr",
    prettyName: "GTH-DZVP-molopt-sr"
  }, {
    periodicBasisSet: "gth-tzvp",
    prettyName: "GTH-TZVP"
  }, {
    periodicBasisSet: "gth-cc-TZVP",
    prettyName: "GTH-cc-TZVP"
  }, {
    periodicBasisSet: "gthtzvpmolopt",
    prettyName: "GTH-TZVP-molopt"
  }, {
    periodicBasisSet: "gthccqzvp",
    prettyName: "GTH-cc-QZVP"
  },
]
const periodicDensityFits = [
  {
    periodicDensityFit: "fftdf",
    prettyName: "Fast Fourier Transform"
  }, {
    periodicDensityFit: "aftdf",
    prettyName: "Analytical Fourier Transform"
  }, {
    periodicDensityFit: "gdf",
    prettyName: "Gaussian"
  }, {
    periodicDensityFit: "mdf",
    prettyName: "Mixed"
  }
]
const periodicCalculationTypes = [
  {
    value: "gammaPoint",
    prettyName: "Gamma Point"
  }, {
    value: "kPoint",
    prettyName: "K-Point"
  },
  {
    value: "superMolecule",
    prettyName: "Super Molecule"
  }
]
const pseudoPotentials = [
  {
    value: false,
    prettyName: "None"
  }, {
    value: "gth-blyp",
    prettyName: "GTH-BLYP"
  },{
    value: "gth-oyp",
    prettyName: "GTH-OYLP"
  },{
    value: "gth-pade",
    prettyName: "GTH-PADE"
  }, {
    value: "gth-pbe",
    prettyName: "GTH-PBE"
  }, {
    value: "gth-hf",
    prettyName: "GTH-HF"
  }
]
*/
