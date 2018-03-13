import _ from 'lodash';

const defaultBasisSets = [
  {
    value: "sto-3g",
    prettyName: "STO+3G"
  }, {
    value: "6-31pg",
    prettyName: "6-31+G"
  }, {
    value: "6-31pgs",
    prettyName: "6-31+G*"
  }, {
    value: "def2-svp",
    prettyName: "def2-SVP"
  },  {
    value: "cc-pvdz",
    prettyName: "cc-pVDZ"
  }, {
    value: "def2-tzvp",
    prettyName: "def2-TZVP"
  },  {
    value: "cc-pvtz",
    prettyName: "cc-pVTZ"
  }, {
    value: "def2-qzvp",
    prettyName: "def2-QZVP"
  }, {
    value: "cc-pvqz",
    prettyName: "cc-pVQZ"
  }
]

const periodicBasisSets = [
  {
    value: "gthszv",
    prettyName: "GTH-SZV"
  }, {
    value: "gthszvmolopt",
    prettyName: "GTH-SZV-molopt"
  }, {
    value: "gthdzv",
    prettyName: "GTH-DZV"
  }, {
    value: "gthdzvp",
    prettyName: "GTH-DZVP"
  }, {
    value: "gthccdzvp",
    prettyName: "GTH-cc-DZVP"
  }, {
    value: "gthdzvpmolopt",
    prettyName: "GTH-DZVP-molopt"
  }, {
    value: "gthdzvpmoloptsr",
    prettyName: "GTH-DZVP-molopt-sr"
  }, {
    value: "gth-tzvp",
    prettyName: "GTH-TZVP"
  }, {
    value: "gth-cc-TZVP",
    prettyName: "GTH-cc-TZVP"
  }, {
    value: "gthtzvpmolopt",
    prettyName: "GTH-TZVP-molopt"
  }, {
    value: "gthccqzvp",
    prettyName: "GTH-cc-QZVP"
  },
]

const basisSets = _.concat(defaultBasisSets, periodicBasisSets);

export {basisSets, defaultBasisSets, periodicBasisSets}
