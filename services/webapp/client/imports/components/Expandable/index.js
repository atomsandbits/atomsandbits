import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState } from 'recompose';
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import {
  ExpandableCardDetails,
  ExpandableCardSummary,
  ExpansionPanel,
} from './styles';

const enhance = compose(
  withState(
    'expanded',
    'setExpanded',
    ({ defaultExpanded }) => defaultExpanded || false
  )
);

const Expandable = ({
  className,
  summary,
  details,
  expandable,
  expanded,
  expandIcon,
  setExpanded,
}) => (
  <ExpansionPanel className={className} expanded={expanded}>
    <ExpansionPanelSummary
      style={{ content: { maxWidth: '100%' } }}
      expandIcon={expandable ? expandIcon : null}
      onClick={() => (expandable ? setExpanded(!expanded) : null)}
    >
      <ExpandableCardSummary>{summary}</ExpandableCardSummary>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <ExpandableCardDetails>{details}</ExpandableCardDetails>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
Expandable.propTypes = {
  className: PropTypes.string,
  summary: PropTypes.element,
  details: PropTypes.element,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  expandIcon: PropTypes.element,
  setExpanded: PropTypes.func,
};
Expandable.defaultProps = {
  summary: '',
  details: '',
  expanded: false,
  expandable: true,
  expandIcon: <ExpandMoreIcon />,
};

export default enhance(Expandable);
