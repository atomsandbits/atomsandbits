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
  // LoadIndicator,
  SystemImage,
  TimeInformation,
} from './styles';

const enhance = compose(onlyUpdateForPropTypes);

const GeometryCardPure = ({
  className,
  geometry: { id, molecularFormula, mass, createdAt },
}) => (
  <CardLink className={className} to={`/geometry/${id}`}>
    <Card>
      <CardTopLeft>
        <EmpiricalFormula formula={molecularFormula || 'undefined'} />
        <InformationalTags />
      </CardTopLeft>
      <CardTopRight>{mass}</CardTopRight>
      <SystemImage src={`/geometry/${id}/image/medium`} />
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
