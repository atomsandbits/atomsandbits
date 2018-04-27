import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  mapProps,
  onlyUpdateForPropTypes,
  withHandlers,
} from 'recompose';
import throttle from 'lodash/throttle';
import uniq from 'lodash/uniq';

import { Molecule } from '/both/imports/tools/Molecule';
import AppLayout from '/client/imports/components/AppLayout';
import MoleculeRenderer from '/client/imports/components/MoleculeRenderer';

import Layers from './components/Layers';
import { withRunProjectMutation } from './withRunProjectMutation';
import { withProvider, withContext } from './context';
import {
  ProjectContainer,
  ProjectContent,
  StartButton,
  AddLayerButton,
} from './styles';

const enhance = compose(
  withRunProjectMutation,
  withProvider,
  withContext,
  mapProps(({ context, runProjectMutation }) => ({
    xyz: context.state.xyz,
    setXyz: context.setXyz,
    addLayer: context.addLayer,
    layers: context.state.layers,
    runProjectMutation,
  })),
  withHandlers({
    submitProject: ({ layers, xyz, runProjectMutation }) =>
      throttle(() => {
        const submitLayers = layers.map(({ type, parameters }) => {
          const submitLayer = {
            type: type.toUpperCase(),
            parameters,
          };
          if (type === 'calculation')
            submitLayer.parameters = { calculation: submitLayer.parameters };
          return submitLayer;
        });
        /* Some sanity check */
        if (!xyz) {
          window.alert('No elements in xyz.');
          return;
        }
        const { atomCollection } = new Molecule({
          xyz,
        });
        if (atomCollection.length === 0) {
          window.alert('No elements in xyz.');
          return;
        }
        let invalidInput;
        layers.forEach(layer => {
          if (
            layer.parameters.atomOne &&
            layer.parameters.atomOne === layer.parameters.atomTwo
          ) {
            window.alert('Atom1 cannot equal Atom2.');
            invalidInput = true;
          }
          if (layer.parameters.method === 'machineLearning') {
            let elements = uniq(
              atomCollection.map(atomDocument => atomDocument.element)
            );
            let supportElements = ['C', 'N', 'O', 'H'];
            elements.forEach(element => {
              if (supportElements.indexOf(element) === -1) {
                window.alert(
                  `Only ${supportElements} elements are supported for this network.`
                );
                invalidInput = true;
              }
            });
          }
        });
        if (invalidInput) return;
        console.log('Submit', submitLayers);
        runProjectMutation({
          input: {
            layers: submitLayers,
            xyzs: [xyz],
          },
        });
      }, 5000),
  }),
  lifecycle({
    componentDidMount() {
      document.title = 'new project | cloudszi';
    },
  }),
  onlyUpdateForPropTypes
);

const NewProjectPure = ({ xyz, setXyz, addLayer, submitProject }) => (
  <AppLayout
    mobileOnlyToolbar
    title="New Project"
    appContent={
      <ProjectContainer>
        <ProjectContent>
          <MoleculeRenderer xyz={xyz} setXyz={setXyz} />
          <Layers />
          <AddLayerButton variant="raised" onClick={addLayer} color="secondary">
            + layer
          </AddLayerButton>
          <StartButton variant="raised" onClick={submitProject} color="primary">
            Start
          </StartButton>
        </ProjectContent>
      </ProjectContainer>
    }
  />
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
