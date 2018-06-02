import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import ProgressiveImage from 'react-progressive-image';
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
  ImageContainer,
  PlaceholderImage,
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

const CalculationCardPure = ({ className, calculation, index }) => (
  <CardLink
    className={className}
    to={`/geometry/${calculation.geometries[0].id}/calculation/${
      calculation.id
    }`}
  >
    <Card>
      <CardTopLeft>
        <EmpiricalFormula
          formula={calculation.geometries[0].molecularFormula || 'undefined'}
        />
        <InformationalTags>
          {convertToLabel({
            type: calculation.parameters.type,
            method: calculation.parameters.method,
          })}
        </InformationalTags>
      </CardTopLeft>
      <CardTopRight>
        {!calculation.completed ? (
          <LoadIndicator size={20} thickness={5} />
        ) : null}
      </CardTopRight>
      <ProgressiveImage
        src={`/geometry/${calculation.geometries[0].id}/image/medium`}
        placeholder={`${calculation.geometries[0].imagePlaceholder}`}
      >
        {(src, loading) => (
          <ImageContainer>
            <PlaceholderImage
              loading={loading}
              dangerouslySetInnerHTML={{
                __html: calculation.geometries[0].imagePlaceholder,
              }}
            />
            <SystemImage
              src={`/geometry/${calculation.geometries[0].id}/image/medium`}
              loading={loading}
            />
          </ImageContainer>
        )}
      </ProgressiveImage>
      <TimeInformation>
        {moment.unix(calculation.createdAt / 1000).fromNow()}
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
CalculationCardPure.propTypes = {
  className: PropTypes.string,
  calculation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

// const ProjectResultPure = ({ result, index }) => <div />;
//
// const displayProjectResult = branch(
//   props => props.type === 'project',
//   renderComponent(ProjectResultPure)
// );

const CalculationCard = enhance(CalculationCardPure);

export { CalculationCard };
export default CalculationCard;
