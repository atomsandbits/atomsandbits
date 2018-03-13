import React from 'react';
import moment from 'moment';
import { compose, branch, renderComponent } from 'recompose';

import {
  Card,
  CardLink,
  CardTopLeft,
  CardTopRight,
  Dot,
  DotContainer,
  EmpiricalFormula,
  InformationalDots,
  InformationalTags,
  LoadIndicator,
  SystemImage,
  TimeInformation,
} from './styles';

const convertPropertiesToLabel = ({ properties }) =>
  Object.keys(properties)
    .filter(property => properties[property] !== null)
    .map(property => property.charAt(0).toUpperCase())
    .join(', ')
    .replace(', _', '');

const CalculationResultPure = ({ result, index }) => (
  <CardLink
    key={`Card-${result.calculation.id}`}
    to={`/geometry/${result.calculation.geometries[0].id}/calculation/${
      result.calculation.id
    }`}
  >
    <Card>
      <CardTopLeft>
        <EmpiricalFormula
          formula={
            result.calculation.geometries[0].molecularFormula || 'undefined'
          }
        />
        <InformationalTags>
          {convertPropertiesToLabel({
            properties: result.calculation.properties || {},
          })}
        </InformationalTags>
      </CardTopLeft>
      <CardTopRight>
        {!result.calculation.completed ? (
          <LoadIndicator size={20} thickness={5} />
        ) : null}
      </CardTopRight>
      <SystemImage
        src={`${
          result.calculation.geometries[0].mediumImage
            ? result.calculation.geometries[0].mediumImage
            : '/molecule4.png'
        }`}
      />
      <TimeInformation>
        {moment.unix(result.calculation.createdAt / 1000).fromNow()}
      </TimeInformation>
      {/* <InformationalDots>
        <DotContainer>
          <Dot color="primary" />
        </DotContainer>
        <DotContainer>
          <Dot color="secondary" />
        </DotContainer>
        <DotContainer>
          <Dot color="tertiary" />
        </DotContainer>
      </InformationalDots> */}
    </Card>
  </CardLink>
);

const ProjectResultPure = ({ result, index }) => <div />;

const displayProjectResult = branch(
  props => props.result.type === 'project',
  renderComponent(ProjectResultPure)
);

const Result = compose(displayProjectResult)(CalculationResultPure);

export { Result };
export default Result;
