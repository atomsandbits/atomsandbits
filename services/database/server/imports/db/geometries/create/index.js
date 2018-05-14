import moment from 'moment';
import { Molecule } from '/server/imports/tools/Molecule';
import { Geometries } from '/both/imports/collections';
import { addUserToGeometry } from '../update';

const createGeometry = ({
  xyz = isRequired('xyz'),
  userId = isRequired('userId'),
  tags = [],
}) => {
  const molecule = new Molecule({ xyz });
  if (molecule.comment !== molecule.empiricalFormula) {
    tags.push(molecule.comment);
  }

  const existingGeometry = Geometries.findOne({
    atomicCoords: molecule.atomicCoords,
  });
  if (existingGeometry) {
    addUserToGeometry({ geometryId: existingGeometry._id, userId, tags });
    return existingGeometry._id;
  }
  const createdAt = moment().valueOf();
  const geometryId = Geometries.insert({
    atomicCoords: molecule.atomicCoords,
    atomCounts: molecule.atomCounts,
    mass: molecule.mass,
    centerOfMass: molecule.centerOfMass,
    molecularFormula: molecule.molecularFormula,
    totalAtoms: molecule.totalAtoms,
    createdAt,
    creatorId: userId,
    users: [
      {
        _id: userId,
        tags,
        createdAt,
      },
    ],
  });
  return geometryId;
};

export { createGeometry };
export default { createGeometry };
