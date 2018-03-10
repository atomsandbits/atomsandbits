import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';
import elasticsearch from 'elasticsearch';
import { Calculations, Geometries, Requests } from '/server/imports/db';
import xyzTools from '/both/imports/tools/xyz';

const convertGeometryToGraph = ({ geometryId, userId }) => {
  const geometry = Geometries.findOne(geometryId);
  return {
    id: geometry._id,
    atomicCoords: geometry.atomicCoords,
    molecularFormula: geometry.molecularFormula,
    atomCount: geometry.atomicCoords.split('\n').length,
    tags: geometry.users[0].tags,
  };
};

const getGeometry = ({ geometryId, userId }) => {
  return convertGeometryToGraph({ geometryId, userId });
};

const getGeometries = ({ geometryIds }) => {
  return geometryIds.map(geometryId => convertGeometryToGraph({ geometryId }));
};

export { convertGeometryToGraph, getGeometry, getGeometries };
