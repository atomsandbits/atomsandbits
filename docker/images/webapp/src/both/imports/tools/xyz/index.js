import _ from 'lodash';
import { sprintf } from 'sprintf-js';

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

const getAtomicCoords = ({ xyzString, xyzCollection }) => {
  if (!xyzCollection) {
    xyzCollection = convertToCollection({ xyzString }).collection;
  } else {
    xyzCollection = xyzCollection.collection;
  }
  if (xyzCollection.length !== 0) {
    let atomicCoords = '';
    for (var i = 0; i < xyzCollection.length; i++) {
      atomicCoords += `${xyzCollection[i].atom} ${xyzCollection[i].x} ${
        xyzCollection[i].y
      } ${xyzCollection[i].z}\n`;
    }
    return atomicCoords.trim();
  }
};

const convertToCollection = ({ xyzString }) => {
  let firstAtomIndex;
  let xyzRows = xyzString.split('\n');
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
        if (!firstAtomIndex && firstAtomIndex != 0) {
          firstAtomIndex = i;
        }
        dataRows.push(xyzRows[i]);
      }
    }
    xyzRows[i] = xyzRows[i].join(' ');
  }
  let xyzCollection = _.map(dataRows, (dataRow) => {
    return {
      atom: capitalize(String(dataRow[0])),
      x: Number(dataRow[1]),
      y: Number(dataRow[2]),
      z: Number(dataRow[3]),
    };
  });
  let geometryName = xyzRows[firstAtomIndex - 1];
  if (!geometryName || !isNaN(Number(geometryName))) {
    geometryName = getEmpiricalFormula({
      xyzCollection: {
        collection: xyzCollection,
      },
    });
  }
  return { collection: xyzCollection, name: geometryName };
};

const getEmpiricalFormula = ({ xyzString, xyzCollection }) => {
  if (!xyzCollection) {
    xyzCollection = convertToCollection({ xyzString }).collection;
  } else {
    xyzCollection = xyzCollection.collection;
  }
  let atomCounts = {};
  _.forEach(xyzCollection, (xyzDocument) => {
    if (atomCounts[xyzDocument.atom]) {
      atomCounts[xyzDocument.atom] += 1;
    } else {
      atomCounts[xyzDocument.atom] = 1;
    }
  });
  let formula = '';
  Object.keys(atomCounts)
    .sort()
    .forEach((key) => {
      formula += key;
      formula += atomCounts[key] > 1 ? atomCounts[key] : '';
    });
  return formula;
};

const normalize = ({ xyzString }) => {
  const { collection, name } = convertToCollection({ xyzString });
  let xyzCollection = collection;
  if (xyzCollection.length !== 0) {
    const geometryName = name;
    xyzCollection = _.sortBy(xyzCollection, ['atom', 'x', 'y', 'z']);
    const firstAtom = {
      x: xyzCollection[0].x,
      y: xyzCollection[0].y,
      z: xyzCollection[0].z,
    };
    xyzCollection = _.map(xyzCollection, (xyzDocument) => {
      xyzDocument.x = Number((xyzDocument.x - firstAtom.x).toFixed(12));
      xyzDocument.y = Number((xyzDocument.y - firstAtom.y).toFixed(12));
      xyzDocument.z = Number((xyzDocument.z - firstAtom.z).toFixed(12));
      return xyzDocument;
    });
    let normalizedXyz = _.join(
      _.map(xyzCollection, (xyzDocument) => {
        return `${xyzDocument.atom} ${xyzDocument.x} ${xyzDocument.y} ${
          xyzDocument.z
        }`;
      }),
      '\n',
    );
    let comment = '';
    if (geometryName) {
      comment = geometryName;
    } else {
      comment = getEmpiricalFormula({ xyzString });
    }
    normalizedXyz = `${xyzCollection.length}\n${comment}\n${normalizedXyz}`;
    // console.log(normalizedXyz);
    return normalizedXyz;
  }
  return '';
};

const prettyFormat = ({ xyzString, geometryName }) => {
  const { collection, name } = convertToCollection({ xyzString });
  const xyzCollection = collection;
  if (!geometryName) {
    geometryName = name;
  }
  let xDecimalsMax = 0;
  let yDecimalsMax = 0;
  let zDecimalsMax = 0;
  _.forEach(xyzCollection, (xyzDocument) => {
    if (xDecimalsMax < countDecimals(xyzDocument.x)) {
      xDecimalsMax = countDecimals(xyzDocument.x);
    }
    if (yDecimalsMax < countDecimals(xyzDocument.y)) {
      yDecimalsMax = countDecimals(xyzDocument.y);
    }
    if (zDecimalsMax < countDecimals(xyzDocument.z)) {
      zDecimalsMax = countDecimals(xyzDocument.z);
    }
  });
  const prettyStringArray = [xyzCollection.length, geometryName];
  _.forEach(xyzCollection, (xyzDocument) => {
    let spacingAfterAtom;
    if (xyzDocument.atom.length === 1) {
      spacingAfterAtom = 6;
    } else {
      spacingAfterAtom = 5;
    }
    prettyStringArray.push(
      sprintf(
        `%s %${xDecimalsMax +
          spacingAfterAtom}.${xDecimalsMax}f %${yDecimalsMax +
          6}.${yDecimalsMax}f %${zDecimalsMax + 6}.${zDecimalsMax}f`,
        xyzDocument.atom,
        xyzDocument.x,
        xyzDocument.y,
        xyzDocument.z
      )
    );
  });
  return prettyStringArray.join('\n');
};

export {
  convertToCollection,
  getEmpiricalFormula,
  normalize,
  prettyFormat,
  getAtomicCoords,
};
