import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';
import elasticsearch from 'elasticsearch';
import { Calculations, Geometries, Requests } from '/server/imports/db';
import xyzTools from '/both/imports/tools/xyz';

const searchClient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URL,
});

const getSortQuery = ({ sortBy, sortOrder }) => {
  switch (sortBy) {
    case 'name':
      return { 'geometry.users.name': sortOrder, 'users.createdAt': -1 };
      break;
    case 'empiricalFormula':
      return { 'geometry.empiricalFormula': sortOrder, 'users.createdAt': -1 };
      break;
    case 'calculationType':
      return { 'parameters.type': sortOrder, 'users.createdAt': -1 };
      break;
    case 'calculationMethod':
      return { 'parameters.method': sortOrder, 'users.createdAt': -1 };
      break;
    case 'basisSet':
      return { 'parameters.basisSet': sortOrder, 'users.createdAt': -1 };
      break;
    case 'created':
      return { 'users.createdAt': sortOrder };
      break;
    case 'status':
      return { startedAt: sortOrder, 'users.createdAt': -1 };
      break;
  }
};

const convertCalculationToGraph = ({
  calculationId,
  userId,
  calculation,
  geometry,
}) => {
  if (!calculation || !geometry) {
    if (!calculationId) {
      calculationId = calculation._id;
    }
    calculation = Calculations.findOne(calculationId);
    const requests = Requests.find({ calculationId });
    if (!calculation) {
      throw new Error('Calculation not found.');
    }
    geometry = Geometries.findOne(calculation.geometryId);
    // Consider including creator in the aggregation or setting
    // the field as a cursor from mongodb
  }
  if (
    !userId ||
    !_.find(calculation.users, _.matchesProperty('userId', userId))
  ) {
    userId = calculation.users[calculation.users.length - 1].userId;
  }
  const creator = Meteor.users.findOne(calculation.createdByUserId);
  const lastRun =
    calculation.runs && calculation.runs.length > 0
      ? calculation.runs[calculation.runs.length - 1]
      : {};
  return {
    id: calculation._id,
    output: lastRun.output,
    running: Boolean(lastRun.startedAt && !lastRun.completedAt),
    completed: Boolean(lastRun.completedAt),
    createdAt: _.find(calculation.users, _.matchesProperty('userId', userId))
      .createdAt,
    startedAt: lastRun.startedAt,
    completedAt: lastRun.completedAt,
    error: Boolean(lastRun.error),
    errorMessage: lastRun.errorMessage,
    // runTime: moment(lastRun.startedAt).diff(lastRun.completedAt),
    parameters: calculation.parameters,
    creator: {
      id: creator._id,
      firstName: creator.profile.name.split(' ')[0],
      lastName: creator.profile.name.split(' ')[1],
      calculations: Calculations.find({ 'users.userId': creator._id }),
    },
    geometries: [
      {
        id: geometry._id,
        name: _.find(geometry.users, _.matchesProperty('userId', userId)).name,
        atomicCoords: geometry.atomicCoords,
        empiricalFormula: geometry.empiricalFormula,
        atomCount: geometry.atomCount,
        calculations: Calculations.find({ geometryId: geometry._id }),
      },
    ],
  };
};

const getCalculation = ({ calculationId, userId }) => {
  return convertCalculationToGraph({ calculationId, userId });
};

const getUserCalculationCount = ({ userId }) => {
  const calculationCount = Calculations.find({
    'users.userId': userId,
  }).count();
  return calculationCount ? calculationCount : 0;
};

const getUserCalculations = ({ userId, limit, skip, sortBy, sortOrder }) => {
  let sortAggregation = getSortQuery({ sortBy, sortOrder });
  let pipeline = [
    {
      $match: {
        'users.userId': userId,
      },
    },
    {
      $lookup: {
        from: 'geometries',
        localField: 'geometryId',
        foreignField: '_id',
        as: 'geometry',
      },
    },
    {
      $unwind: '$geometry',
    },
    {
      $unwind: '$users',
    },
    {
      $unwind: '$geometry.users',
    },
    {
      $match: {
        'users.userId': userId,
        'geometry.users.userId': userId,
      },
    },
    {
      $sort: sortAggregation,
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
  let calculations = Calculations.aggregate(pipeline);
  return _.map(calculations, (calculation) => {
    return convertCalculationToGraph({
      calculationId: calculation._id,
      geometryId: calculation.geometry._id,
      userId: userId,
    });
  });
};

async function searchUserCalculations({ userId, limit, skip, search }) {
  let body,
    calculationMatches = [],
    geometryMatches = [];
  try {
    body = await searchClient.search({
      from: skip,
      size: limit * 2,
      index: process.env.DB_NAME,
      type: 'geometries,calculations',
      body: {
        query: {
          bool: {
            filter: {
              term: {
                'users.userId': userId.toLowerCase(),
              },
            },
            should: [
              {
                multi_match: {
                  query: search,
                  fields: [
                    'parameters.type',
                    'parameters.method',
                    'parameters.program',
                    'parameters.basisSet',
                    'parameters.network',
                    'users.name',
                    'empiricalFormula',
                  ],
                  fuzziness: 5,
                  prefix_length: 0,
                  max_expansions: 100,
                },
              },
            ],
          },
        },
        /* Eventually exclude some fields like atomicCoords and output */
      },
    });
    let hits = body.hits.hits;
    _.forEach(hits, (hit) => {
      if (hit._score < 0.01) {
        return;
      }
      switch (hit._type) {
        case 'calculations':
          calculationMatches.push(hit);
          break;
        case 'geometries':
          geometryMatches.push(hit);
          break;
      }
    });
    // console.log(calculationMatches);
    // console.log(geometryMatches);
    let calculations = Calculations.find({
      $or: [
        {
          _id: {
            $in: _.map(calculationMatches, '_id'),
          },
        },
        {
          geometryId: {
            $in: _.map(geometryMatches, '_id'),
          },
        },
      ],
    }).fetch();
    // console.log(calculations)
    console.log(`Search User Calculations: ${search}...`);
    calculations = _.sortBy(calculations, (calculation) => {
      let geometryMatch = _.find(geometryMatches, {
        _id: calculation.geometryId,
      });
      let geometryScore = geometryMatch ? geometryMatch._score : 0;
      let calculationMatch = _.find(calculationMatches, {
        _id: calculation._id,
      });
      let calculationScore = calculationMatch ? calculationMatch._score : 0;
      console.log(
        `id: ${calculation._id} score: ${geometryScore + calculationScore}`
      );
      return 1 / (geometryScore + calculationScore);
    });
    return _.map(calculations, (calculation) => {
      return convertCalculationToGraph({
        calculationId: calculation._id,
        geometryId: calculation.geometryId,
        userId: userId,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

const getCalculationCount = () => {
  return Calculations.find().count();
};

const getCalculations = ({ userId, limit, skip, sortBy, sortOrder }) => {
  let sortAggregation = getSortQuery({ sortBy, sortOrder });
  let pipeline = [
    {
      $lookup: {
        from: 'geometries',
        localField: 'geometryId',
        foreignField: '_id',
        as: 'geometry',
      },
    },
    {
      $unwind: '$geometry',
    },
    {
      $addFields: {
        'geometry.users': {
          $arrayElemAt: ['$geometry.users', 0],
        },
      },
    },
    {
      $sort: sortAggregation,
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
  let calculations = Calculations.aggregate(pipeline);
  return _.map(calculations, (calculation) => {
    return convertCalculationToGraph({
      calculationId: calculation._id,
      geometryId: calculation.geometry._id,
    });
  });
};

async function searchCalculations({ userId, limit, skip, search }) {
  let body,
    calculationMatches = [],
    geometryMatches = [];
  try {
    body = await searchClient.search({
      from: skip,
      size: limit * 2,
      index: process.env.DB_NAME,
      type: 'geometries,calculations',
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: search,
                  fields: [
                    'parameters.type',
                    'parameters.method',
                    'parameters.program',
                    'parameters.basisSet',
                    'parameters.network',
                    'users.name',
                    'empiricalFormula',
                  ],
                  fuzziness: 5,
                  prefix_length: 0,
                  max_expansions: 100,
                },
              },
            ],
          },
        },
        /* Eventually exclude some fields like atomicCoords and output */
      },
    });
    let hits = body.hits.hits;
    _.forEach(hits, (hit) => {
      if (hit._score < 0.01) {
        return;
      }
      switch (hit._type) {
        case 'calculations':
          calculationMatches.push(hit);
          break;
        case 'geometries':
          geometryMatches.push(hit);
          break;
      }
    });
    // console.log(calculationMatches);
    // console.log(geometryMatches);
    let calculations = Calculations.find({
      $or: [
        {
          _id: {
            $in: _.map(calculationMatches, '_id'),
          },
        },
        {
          geometryId: {
            $in: _.map(geometryMatches, '_id'),
          },
        },
      ],
    }).fetch();
    console.log(`Search Calculations: ${search}...`);
    calculations = _.sortBy(calculations, (calculation) => {
      let geometryMatch = _.find(geometryMatches, {
        _id: calculation.geometryId,
      });
      let geometryScore = geometryMatch ? geometryMatch._score : 0;
      let calculationMatch = _.find(calculationMatches, {
        _id: calculation._id,
      });
      let calculationScore = calculationMatch ? calculationMatch._score : 0;
      console.log(
        `id: ${calculation._id} score: ${geometryScore + calculationScore}`
      );
      return 1 / (geometryScore + calculationScore);
    });
    return _.map(calculations, (calculation) => {
      return convertCalculationToGraph({
        calculationId: calculation._id,
        geometryId: calculation.geometryId,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  getCalculation,
  getUserCalculations,
  getUserCalculationCount,
  searchUserCalculations,
  getCalculations,
  getCalculationCount,
  searchCalculations,
};
