import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  branch,
  renderComponent,
  mapProps,
  withState,
} from 'recompose';
import { withData } from './withData';

import { LinearProgress } from 'material-ui/Progress';

import { Tags } from './Tags';

import { defaults, Line as LineChart } from 'react-chartjs-2';

import Expandable from '/client/imports/components/Expandable';
import xyzTools from '/both/imports/tools/xyz';
import {
  AtomicCoords,
  AtomicCoordsContainer,
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
  ColumnContent,
  ExpandableCardDetails,
  ExpandableCardSummary,
  ExpansionPanel,
  GeometryCalculationColumn,
  GeometryInformationColumn,
  GeometryPageContainer,
  GeometryPageContent,
  Link,
  Links,
  SpeckRenderer,
} from './styles';

/* Demo Code */
// import { atomicCoords } from './atomic-coords';
// import { forces } from './forces';
// import { data } from './harmonic-spectra-data';
import { colors } from '/client/imports/theme';

// const chartData = {
//   datasets: [
//     {
//       data,
//     },
//   ],
// };
// defaults.global.defaultFontFamily = 'Space Mono';
// const chartOptions = {
//   title: {
//     display: false,
//   },
//   legend: {
//     display: false,
//   },
//   elements: {
//     line: {
//       fill: false,
//       // borderWidth: 0,
//       // tension: 0.8,
//       // capBezierPoints: false,
//       // borderColor: colors.primary,
//     },
//     point: {
//       radius: 2,
//       backgroundColor: colors.primary,
//       // backgroundColor: 'rgba(0,0,0,0)',
//       borderColor: 'rgba(0,0,0,0)',
//     },
//   },
//   scales: {
//     yAxes: [
//       {
//         scaleLabel: {
//           labelString: 'intensity',
//           display: true,
//         },
//       },
//     ],
//     xAxes: [
//       {
//         type: 'linear',
//         position: 'bottom',
//         scaleLabel: {
//           labelString: 'wavelength (cm-1)',
//           display: true,
//         },
//       },
//     ],
//   },
// };

class GeometryTest extends React.Component {
  state = {
    xyz: xyzTools.prettyFormat({
      xyzString: atomicCoords,
    }),
  };
  render() {
    return (
      <GeometryPageContainer>
        <GeometryPageContent>
          <GeometryCalculationColumn>
            <ColumnContent>
              <Expandable
                summary={[
                  <CardTitle>Energy</CardTitle>,
                  <CardPropertyLabel>CCSD(T) 631+G*</CardPropertyLabel>,
                  <CardProperty>5327.1111</CardProperty>,
                ]}
                details=""
              />
              <Expandable
                summary={[
                  <CardTitle>Force</CardTitle>,
                  <CardPropertyLabel>CCSD(T) 631+G*</CardPropertyLabel>,
                  <CardProperty small>{forces}</CardProperty>,
                ]}
                details={[
                  <CardPropertyRow>
                    <CardPropertyLabel>CCSD(T) 631+G*</CardPropertyLabel>
                    <CardProperty small>{forces}</CardProperty>
                  </CardPropertyRow>,
                  <CardPropertyRow>
                    <CardPropertyLabel>CCSD(T) 631+G*</CardPropertyLabel>
                    <CardProperty small>{forces}</CardProperty>
                  </CardPropertyRow>,
                ]}
              />
              <Expandable
                summary={[
                  <CardTitle>Harmonic Spectra</CardTitle>,
                  <CardPropertyLabel>CCSD(T) 631+G*</CardPropertyLabel>,
                  <CardProperty>
                    <LineChart
                      data={chartData}
                      width={500}
                      height={300}
                      options={chartOptions}
                    />
                  </CardProperty>,
                ]}
                details=""
              />
            </ColumnContent>
          </GeometryCalculationColumn>
          <GeometryInformationColumn>
            <ColumnContent>
              <SpeckRenderer xyz={this.state.xyz} />
              <Links>
                <CardTitle>Linked Projects</CardTitle>
                <Link to="/">53189084572398</Link>
              </Links>
              <Links>
                <CardTitle>Outputs</CardTitle>
                <Link to="/">TensorMol 1</Link>
                <Link to="/">TensorMol 2</Link>
                <Link to="/">Psi4</Link>
                <Link to="/">PySCF</Link>
              </Links>
              <AtomicCoordsContainer>
                <CardTitle>Atomic Coordinates</CardTitle>
                <AtomicCoords>{atomicCoords}</AtomicCoords>
              </AtomicCoordsContainer>
            </ColumnContent>
          </GeometryInformationColumn>
        </GeometryPageContent>
      </GeometryPageContainer>
    );
  }
}

const GeometryPure = ({geometry, energies, forces}) => (
  <GeometryPageContainer>
    {console.log(geometry)}
    <GeometryPageContent>
      <GeometryCalculationColumn>
        <ColumnContent />
      </GeometryCalculationColumn>
      <GeometryInformationColumn>
        <ColumnContent>
          <SpeckRenderer
            xyz={xyzTools.prettyFormat({
              xyzString: geometry.atomicCoords,
            })}
          />
          <Tags>
            <Tag label="benzene" onDelete={() => {}} onClick={() => {}} />
            <Tag label="C6H6" onDelete={() => {}} onClick={() => {}} />
            <Tag label="stable" onDelete={() => {}} onClick={() => {}} />
            <Tag label="low energy" onDelete={() => {}} onClick={() => {}} />
          </Tags>
          <AtomicCoordsContainer>
            <CardTitle>Atomic Coordinates</CardTitle>
            <AtomicCoords>
              {xyzTools.prettyFormat({
                xyzString: geometry.atomicCoords,
              })}
            </AtomicCoords>
          </AtomicCoordsContainer>
        </ColumnContent>
      </GeometryInformationColumn>
    </GeometryPageContent>
  </GeometryPageContainer>
);

const LIMIT = 30;

const Loading = props => <LinearProgress />;

const displayLoadingState = branch(
  props => props.data.loading,
  renderComponent(Loading)
);

const mapDataProps = mapProps(({ match, data, ...otherProps }) => {
  return {
    calculationId: match.params.calculationId,
    geometry: data.geometry,
    energies: data.geometry.energies,
    forces: data.geometry.forces,
    geometryOptimizations: data.geometry.optimizations,
    harmonicSpectra: data.geometry.harmonicSpectra,
    refetch: data.refetch,
    ...otherProps,
  };
});

const Geometry = compose(withData, displayLoadingState, mapDataProps)(
  GeometryPure
);

export { Geometry };
export default Geometry;
