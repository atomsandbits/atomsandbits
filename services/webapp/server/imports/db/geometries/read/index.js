// import { Meteor } from 'meteor/meteor';
// import _ from 'lodash';
// import moment from 'moment';
// import elasticsearch from 'elasticsearch';
// import xyzTools from '/both/imports/tools/xyz';
import { Geometries } from '/server/imports/db';

const convertGeometryToGraph = ({ geometryId, userId }) => {
  const geometry = Geometries.findOne(geometryId);
  const { _id, atomicCoords, molecularFormula, mass, images, users } = geometry;
  return {
    id: _id,
    atomicCoords: atomicCoords,
    molecularFormula: molecularFormula,
    atomCount: atomicCoords.split('\n').length,
    mass: mass,
    imagePlaceholder: images && images.placeholder ? images.placeholder : null,
    mediumImage:
      images && images['512']
        ? Buffer.from(images['512'], 'binary').toString('base64')
        : null,
    tags: users[0] ? users[0].tags : [],
  };
};

const getGeometry = ({ geometryId, userId }) => {
  return convertGeometryToGraph({ geometryId, userId });
};

const getGeometries = ({ geometryIds }) => {
  return geometryIds.map((geometryId) =>
    convertGeometryToGraph({ geometryId })
  );
};

export { convertGeometryToGraph, getGeometry, getGeometries };
