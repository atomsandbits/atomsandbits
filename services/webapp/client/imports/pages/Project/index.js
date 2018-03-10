import React from 'react';
import { compose, withProps, withState, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import AddLayerIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';

import Expandable from '/client/imports/components/Expandable';
import MoleculeRenderer from '/client/imports/components/MoleculeRenderer';
import GroupRenderer from '/client/imports/components/GroupRenderer';
import {
  ProjectContainer,
  ProjectContent,
  MoleculeIcon,
  GroupIcon,
  SystemTypesContainer,
  CardTitle,
} from './styles';

const xyz = `\
C     0.00010350    -0.00002292     0.00005958
C     1.45231106    -0.40161983    -0.17350624
C     2.34458902     0.02958891     0.98452565
C     3.25215947    -0.08238094    -1.74168405
C     3.78537359    -0.36385876     0.70549140
C     4.26121012     0.18344319    -0.62938590
H    -0.53559623    -0.15972281    -0.93664015
H    -0.48893205    -0.59111787     0.77496172
H    -0.08331875     1.05809607     0.26189755
H     1.19256350    -0.21181943     2.54237356
H     1.51426730    -1.49340963    -0.27334811
H     2.30234279     1.12603950     1.07182660
H     2.58870456    -1.66362233    -2.58227339
H     3.47422110     0.60040622    -2.57224157
H     3.83703148    -1.46039955     0.70418275
H     4.37163779    -0.16843529     2.53629392
H     4.82798612     1.69372740     0.34850597
H     5.19819031    -0.33166685    -0.88995078
O     1.92408181     0.21236895    -1.36944991
O     2.00586258    -0.59099484     2.20591912
O     3.40013384    -1.40992667    -2.13761992
O     4.46983244     1.56333772    -0.53749905
O     4.63391164     0.18869938     1.68384712
`;

const xyzs = [xyz, xyz, xyz, xyz, xyz];

const propTypes = {
  systemType: PropTypes.string.isRequired,
};

const enhance = compose(
  // withProps({ hello: 'world' }),
  withState('systemType', 'setSystemType', 'molecule'),
  withState('xyz', 'setXyz', xyz),
  withState('xyzs', 'setXyzs', xyzs),
  setPropTypes(propTypes)
);

const Project = ({ systemType, setSystemType, xyz, setXyz, xyzs, setXyzs }) => (
  <ProjectContainer>
    <ProjectContent>
      <SystemTypesContainer>
        <IconButton onClick={() => setSystemType('molecule')}>
          <MoleculeIcon />
        </IconButton>{' '}
        <IconButton onClick={() => setSystemType('group')}>
          <GroupIcon />
        </IconButton>
      </SystemTypesContainer>
      {systemType === 'molecule' ? (
        <MoleculeRenderer xyz={xyz} setXyz={setXyz} />
      ) : (
        <GroupRenderer xyzs={xyzs} setXyzs={setXyzs} />
      )}
      <Expandable
        summary={<CardTitle>Conformer Search</CardTitle>}
        details={<div>Some options...</div>}
        expandIcon=""
        defaultExpanded
        expandable={false}
      />
      <Expandable
        summary={<CardTitle>Harmonic Spectra</CardTitle>}
        details={<div>Some options...</div>}
        expandIcon={<AddLayerIcon />}
        expandable={false}
      />
    </ProjectContent>
  </ProjectContainer>
);
Project.propTypes = propTypes;

export default enhance(Project);
