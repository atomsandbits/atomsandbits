import React from 'react';
import { compose, withProps, withState, setPropTypes } from 'recompose';
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

const propTypes = {};

const enhance = compose(
  withState(
    'expanded',
    'setExpanded',
    ({ defaultExpanded }) => defaultExpanded || false
  ),
  setPropTypes(propTypes)
);

const Expandable = ({
  summary,
  details,
  expandable,
  expanded,
  expandIcon,
  setExpanded,
}) => (
  <ExpansionPanel expanded={expanded}>
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
Expandable.propTypes = propTypes;
Expandable.defaultProps = {
  summary: '',
  details: '',
  expanded: false,
  expandable: true,
  expandIcon: <ExpandMoreIcon />
};

export default enhance(Expandable);
