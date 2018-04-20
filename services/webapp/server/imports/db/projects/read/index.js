import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';
import elasticsearch from 'elasticsearch';
import { Projects, Geometries, Requests } from '/server/imports/db';
import xyzTools from '/both/imports/tools/xyz';

const convertProjectToGraph = ({ projectId, project, userId }) => {
  if (!project) {
    project = Projects.findOne(projectId);
  }
  if (!projectId) {
    projectId = project._id;
  }
  const request =
    Requests.findOne(
      { projectId }
      // { sortBy: { createdAt: -1 } }
    ) || {};
  // console.log(request);
  if (!project) {
    throw new Error('Project not found.');
  }
  const { completed, completedAt, createdAt, running, startedAt } = request;
  const { error, geometryIds, _id, layerIds } = project;
  return {
    // runTime: moment(lastRun.startedAt).diff(lastRun.completedAt),
    completed: Boolean(completed),
    completedAt,
    createdAt,
    error: Boolean(error),
    errorMessage: error ? error.message : null,
    geometryIds,
    id: _id,
    layerIds,
    running: Boolean(running),
    startedAt,
  };
};

const getProject = ({ projectId, userId }) => {
  return convertProjectToGraph({ projectId, userId });
};

const getProjects = ({ geometryId, projectIds, userId }) => {
  let projects;
  if (projectIds) {
    projects = Projects.find({ _id: { $in: projectIds } }).fetch();
  } else if (geometryId) {
    projects = Projects.find({ geometryIds: geometryId }).fetch();
  }
  return projects.map(project => {
    return convertProjectToGraph({ project, userId });
  });
};

export { convertProjectToGraph, getProject, getProjects };
