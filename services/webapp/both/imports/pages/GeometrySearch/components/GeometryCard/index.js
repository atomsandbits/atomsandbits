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
  // LoadIndicator,
  ImageContainer,
  PlaceholderImage,
  SystemImage,
  TimeInformation,
} from './styles';

const enhance = compose(onlyUpdateForPropTypes);

const GeometryCardPure = ({
  className,
  geometry: { id, molecularFormula, imagePlaceholder, mass, createdAt },
}) => (
  <CardLink className={className} to={`/geometry/${id}`}>
    <Card>
      <CardTopLeft>
        <EmpiricalFormula formula={molecularFormula || 'undefined'} />
        <InformationalTags />
      </CardTopLeft>
      <CardTopRight>{mass}</CardTopRight>
      <ProgressiveImage
        src={`/geometry/${id}/image/medium`}
        placeholder={`data:image/svg+xml;base64,${imagePlaceholder}`}
      >
        {(src, loading) => (
          <ImageContainer>
            <PlaceholderImage
              loading={loading}
              dangerouslySetInnerHTML={{ __html: imagePlaceholder }}
            />
            <SystemImage
              src={`/geometry/${id}/image/medium`}
              loading={loading}
            />
          </ImageContainer>
        )}
      </ProgressiveImage>
      <TimeInformation>
        {moment.unix(createdAt / 1000).fromNow()}
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
GeometryCardPure.propTypes = {
  className: PropTypes.string,
  geometry: PropTypes.object.isRequired,
};

const GeometryCard = enhance(GeometryCardPure);

export { GeometryCard };
export default GeometryCard;
