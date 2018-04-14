import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  mapProps,
  onlyUpdateForPropTypes,
  withHandlers,
} from 'recompose';

import MoleculeRenderer from '/client/imports/components/MoleculeRenderer';

import Layers from './components/Layers';
import { withContext } from './context';
import {
  ProjectContainer,
  ProjectContent,
  StartButton,
  AddLayerButton,
} from './styles';

const enhance = compose(
  withContext,
  mapProps(({ context }) => ({
    xyz: context.state.xyz,
    setXyz: context.setXyz,
    addLayer: context.addLayer,
  })),
  withHandlers({
    submitProject: props => () => {
      console.log('test');
    },
  }),
  lifecycle({
    componentDidMount() {
      document.title = 'new project | cloudszi';
    },
  }),
  onlyUpdateForPropTypes
);

const NewProjectPure = ({ xyz, setXyz, addLayer, submitProject }) => (
  <ProjectContainer>
    <ProjectContent>
      <MoleculeRenderer xyz={xyz} setXyz={setXyz} />
      <Layers />
      <AddLayerButton raised onClick={addLayer} color="secondary">
        + layer
      </AddLayerButton>
      <StartButton raised onClick={submitProject} color="primary">
        Start
      </StartButton>
    </ProjectContent>
  </ProjectContainer>
);
NewProjectPure.propTypes = {
  xyz: PropTypes.string.isRequired,
  setXyz: PropTypes.func.isRequired,
  addLayer: PropTypes.func.isRequired,
  submitProject: PropTypes.func.isRequired,
};

const NewProject = enhance(NewProjectPure);

export { NewProject };
export default NewProject;
