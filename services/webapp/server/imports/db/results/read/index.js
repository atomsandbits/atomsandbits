import _ from 'lodash';
import elasticsearch from 'elasticsearch';
import { Calculations, Projects } from '/server/imports/db';
import { convertCalculationToGraph } from '/server/imports/db/calculations/read';
import { convertProjectToGraph } from '/server/imports/db/projects/read';

const convertResultToGraph = ({ result }) => {
  return result;
};

const getResults = ({ userId, limit, skip, search, sortBy, sortOrder }) => {
  const calculations = Calculations.find(
    { 'users._id': userId },
    { limit, fields: { _id: 1, 'users.$': 1 } }
  ).fetch();
  const projects = Projects.find(
    { userId },
    { limit, fields: { _id: 1, createdAt: 1 } }
  ).fetch();
  let results = [];
  results.push(
    calculations.map(calculation => {
      return {
        type: 'calculation',
        calculationId: calculation._id,
        createdAt: calculation.users[0].createdAt,
      };
    })
  );
  results.push(
    projects.map(project => {
      return {
        type: 'project',
        projectId: project._id,
        createdAt: project.createdAt,
      };
    })
  );
  results = _.reverse(_.sortBy(_.flatten(results), 'createdAt'));
  return results.map(result => convertResultToGraph({ result }));
};

export { getResults, convertResultToGraph };
