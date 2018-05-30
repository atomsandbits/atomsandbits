import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import moment from 'moment';

import {
  Card,
  CardLink,
  CardTopLeft,
  CardTopRight,
  // Dot,
  // DotContainer,
  EmpiricalFormula,
  // InformationalDots,
  InformationalTags,
  LoadIndicator,
  SystemImage,
  TimeInformation,
} from '../styles';

const convertToLabel = ({ type, method }) =>
  `${type.charAt(0).toUpperCase()}${
    type.split(/(?=[A-Z])/)[1]
      ? type
          .split(/(?=[A-Z])/)[1]
          .charAt(0)
          .toUpperCase()
      : ''
  }-${
    method.split(/(?=[A-Z])/)[1]
      ? method.charAt(0).toUpperCase() +
        method
          .split(/(?=[A-Z])/)[1]
          .charAt(0)
          .toUpperCase()
      : method.toUpperCase()
  }`;
// Object.keys(properties)
//   .filter(property => properties[property] !== null)
//   .map(property => property.charAt(0).toUpperCase())
//   .join(', ')
//   .replace(', _', '');

const enhance = compose(onlyUpdateForPropTypes);

const ProjectCardPure = ({ className, project, index }) => (
  <CardLink className={className} to={`/project/${project.id}`}>
    <Card>
      <CardTopLeft>
        <EmpiricalFormula
          formula={project.geometries[0].molecularFormula || 'undefined'}
        />
        <InformationalTags>
          {project.layers.map(
            (layer, index) =>
              convertToLabel({
                type:
                  layer.type === 'CALCULATION'
                    ? layer.parameters.calculation.type
                    : layer.type,
                method:
                  layer.type === 'CALCULATION'
                    ? layer.parameters.calculation.method
                    : '',
              }) + (index !== project.layers.length - 1 ? '->' : '')
          )}
        </InformationalTags>
      </CardTopLeft>
      <CardTopRight>
        {!project.completed ? <LoadIndicator size={20} thickness={5} /> : null}
      </CardTopRight>
      <SystemImage src={`/geometry/${project.geometries[0].id}/image/medium`} />
      <TimeInformation>
        {moment.unix(project.createdAt / 1000).fromNow()}
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
ProjectCardPure.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

// const ProjectResultPure = ({ result, index }) => <div />;
//
// const displayProjectResult = branch(
//   props => props.type === 'project',
//   renderComponent(ProjectResultPure)
// );

const ProjectCard = enhance(ProjectCardPure);

export { ProjectCard };
export default ProjectCard;
