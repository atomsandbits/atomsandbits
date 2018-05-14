import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  branch,
  renderComponent,
  mapProps,
  withProps,
  onlyUpdateForPropTypes,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import { LinearProgress } from 'material-ui/Progress';

import Molecule from '/both/imports/tools/Molecule';
import AppLayout from '/client/imports/components/AppLayout';
import MoleculeRenderer from '/client/imports/components/MoleculeRenderer';

import Layer from './components/Layer';
import { withProject } from './withProject';
import { ProjectContainer, ProjectContent } from './styles';

const Loading = (props) => (
  <AppLayout
    mobileOnlyToolbar
    title="Project"
    appContent={
      <ProjectContainer>
        <LinearProgress />
      </ProjectContainer>
    }
  />
);

const displayLoadingState = branch(
  (props) => props.data.loading || !props.data.project,
  renderComponent(Loading)
);

const enhance = compose(
  withProject,
  displayLoadingState,
  mapProps(({ data, ...otherProps }) => ({
    project: data.project,
    ...otherProps,
  })),
  onlyUpdateForPropTypes
);

const ProjectPure = ({ project: { id, geometries, layers } }) => (
  <AppLayout
    mobileOnlyToolbar
    title="Project"
    appContent={
      <ProjectContainer>
        <ProjectContent>
          {geometries.length === 1 ? (
            <MoleculeRenderer
              disabled
              xyz={
                new Molecule({ xyz: geometries[0].atomicCoords }).prettify().xyz
              }
            />
          ) : null}
          {layers.map((layer) => <Layer key={layer.id} {...layer} />)}
        </ProjectContent>
      </ProjectContainer>
    }
  />
);
ProjectPure.propTypes = {
  project: PropTypes.object.isRequired,
};

const Project = enhance(ProjectPure);

export { Project };
export default Project;
