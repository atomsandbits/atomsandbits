import { sprintf } from 'sprintf-js';
import atomicMasses from './atomic-masses.json';

const countDecimals = (number) => {
  if (Math.floor(number.valueOf()) === number.valueOf()) return 0;
  if (number.toString().indexOf('e-') !== -1) {
    return parseInt(number.toString().split('e-')[1], 10);
  }
  return number.toString().split('.')[1].length || 0;
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

class Molecule {
  constructor({ xyz }) {
    if (!xyz) throw new Error('xyz not defined');
    if (typeof xyz !== 'string') throw new Error('xyz must be a string');
    this.xyz = xyz;
    this.atomCollection = this.createAtomCollection();
    this.atomCounts = this.createAtomCounts();
    this.comment = this.createComment();
    this.molecularFormula = this.createMolecularFormula();
    this.mass = this.createMass();
  }
  createComment() {
    if (this.comment) return this.comment;
    let firstAtomIndex;
    let xyzRows = this.xyz.split('\n');
    for (var i = 0, len = xyzRows.length; i < len; i++) {
      xyzRows[i] = xyzRows[i]
        .trim()
        .split(' ')
        .filter(Boolean);
      // Remove Atom Index Label if it Exists
      if (!isNaN(Number(xyzRows[i][0]))) xyzRows[i].splice(0, 1);
      if (xyzRows[i][0]) {
        if (
          !isNaN(Number(xyzRows[i][1])) &&
          !isNaN(Number(xyzRows[i][2])) &&
          !isNaN(Number(xyzRows[i][3]))
        ) {
          firstAtomIndex = i;
          break;
        }
      }
      xyzRows[i] = xyzRows[i].join(' ');
    }
    let comment = xyzRows[firstAtomIndex - 1];
    if (!comment || !isNaN(Number(comment))) {
      comment = this.createMolecularFormula();
    }
    return comment;
  }
  createMolecularFormula() {
    if (this.molecularFormula) return this.molecularFormula;
    const atomCounts = this.createAtomCounts();
    let formula = '';
    Object.keys(atomCounts)
      .sort()
      .forEach((key) => {
        formula += key;
        formula += atomCounts[key] > 1 ? atomCounts[key] : '';
      });
    return formula;
  }
  createMass() {
    if (this.mass) return this.mass;
    const atomCounts = this.createAtomCounts();
    let mass = 0;
    Object.keys(atomCounts).forEach((key) => {
      mass += atomicMasses[key].mass * atomCounts[key];
    });
    return Math.round(mass * 1000000) / 1000000;
  }
  createAtomCollection() {
    if (this.atomCollection) return this.atomCollection;

    let xyzRows = this.xyz.split('\n');
    let dataRows = [];
    for (var i = 0, len = xyzRows.length; i < len; i++) {
      xyzRows[i] = xyzRows[i]
        .trim()
        .split(' ')
        .filter(Boolean);
      // Remove Atom Index Label if it Exists
      if (!isNaN(Number(xyzRows[i][0]))) xyzRows[i].splice(0, 1);
      if (xyzRows[i][0]) {
        if (
          !isNaN(Number(xyzRows[i][1])) &&
          !isNaN(Number(xyzRows[i][2])) &&
          !isNaN(Number(xyzRows[i][3]))
        ) {
          dataRows.push(xyzRows[i]);
        }
      }
      xyzRows[i] = xyzRows[i].join(' ');
    }
    return dataRows.map((dataRow) => {
      return {
        element: capitalize(String(dataRow[0])),
        x: Number(Number(dataRow[1]).toFixed(6)),
        y: Number(Number(dataRow[2]).toFixed(6)),
        z: Number(Number(dataRow[3]).toFixed(6)),
      };
    });
  }
  get atomicCoords() {
    const atomCollection = this.createAtomCollection();
    if (atomCollection.length === 0) {
      return '';
    }
    let atomicCoords = '';
    for (let i = 0; i < atomCollection.length; i += 1) {
      atomicCoords += `${atomCollection[i].element} ${atomCollection[i].x} ${
        atomCollection[i].y
      } ${atomCollection[i].z}\n`;
    }
    return atomicCoords.trim();
  }
  get totalAtoms() {
    const atomCounts = this.createAtomCounts();
    let totalAtoms = 0;
    Object.keys(atomCounts).forEach((key) => {
      totalAtoms += atomCounts[key];
    });
    return totalAtoms;
  }
  get centerOfMass() {
    const atomCollection = this.createAtomCollection();
    const mass = this.createMass();
    if (atomCollection.length === 0) {
      return;
    }
    const centerOfMass = { x: 0, y: 0, z: 0 };
    for (let i = 0; i < atomCollection.length; i += 1) {
      centerOfMass.x +=
        atomCollection[i].x * atomicMasses[atomCollection[i].element].mass;
      centerOfMass.y +=
        atomCollection[i].y * atomicMasses[atomCollection[i].element].mass;
      centerOfMass.z +=
        atomCollection[i].z * atomicMasses[atomCollection[i].element].mass;
    }
    centerOfMass.x /= mass;
    centerOfMass.y /= mass;
    centerOfMass.z /= mass;
    return centerOfMass;
  }
  createAtomCounts() {
    const atomCollection = this.createAtomCollection();
    let atomCounts = {};
    atomCollection.forEach((atomDocument) => {
      if (atomCounts[atomDocument.element]) {
        atomCounts[atomDocument.element] += 1;
      } else {
        atomCounts[atomDocument.element] = 1;
      }
    });
    return atomCounts;
  }
  prettify() {
    const atomCollection = this.createAtomCollection();
    const comment = this.createComment();

    let xDecimalsMax = 0;
    let yDecimalsMax = 0;
    let zDecimalsMax = 0;
    atomCollection.forEach((atomDocument) => {
      if (xDecimalsMax < countDecimals(atomDocument.x)) {
        xDecimalsMax = countDecimals(atomDocument.x);
      }
      if (yDecimalsMax < countDecimals(atomDocument.y)) {
        yDecimalsMax = countDecimals(atomDocument.y);
      }
      if (zDecimalsMax < countDecimals(atomDocument.z)) {
        zDecimalsMax = countDecimals(atomDocument.z);
      }
    });
    const prettyStringArray = [atomCollection.length, comment];
    atomCollection.forEach((atomDocument) => {
      let spacingAfterAtom;
      if (atomDocument.element.length === 1) {
        spacingAfterAtom = 6;
      } else {
        spacingAfterAtom = 5;
      }
      prettyStringArray.push(
        sprintf(
          `%s %${xDecimalsMax +
            spacingAfterAtom}.${xDecimalsMax}f %${yDecimalsMax +
            6}.${yDecimalsMax}f %${zDecimalsMax + 6}.${zDecimalsMax}f`,
          atomDocument.element,
          atomDocument.x,
          atomDocument.y,
          atomDocument.z
        )
      );
    });
    const xyz = prettyStringArray.join('\n');
    return new Molecule({ xyz });
  }
}

export { Molecule };
export default Molecule;
