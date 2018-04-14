import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

const enhance = compose();

const ProjectPure = () => {
  return <div>Project</div>;
};
ProjectPure.propTypes = {};

const Project = enhance(ProjectPure);

export { Project };
export default Project;
