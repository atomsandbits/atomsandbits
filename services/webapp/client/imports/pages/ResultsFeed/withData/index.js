import { Meteor } from 'meteor/meteor';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

import apolloClient from '/client/imports/apollo-client';

const dataQuery = gql`
  query {
    results {
      type
      createdAt
      project {
        id
      }
      calculation {
        id
        createdAt
        completed
        properties {
          energy
          force
          geometries
        }
        geometries {
          id
          molecularFormula
          mediumImage
        }
      }
    }
  }
`;

const withData = compose(
  graphql(dataQuery, {
    options: () => ({ pollInterval: 60000 }),
  })
);

const queryWatcher = apolloClient.watchQuery({
  query: dataQuery,
  fetchPolicy: 'network-only',
});
let loginTracker;
Meteor.startup(() => {
  loginTracker = Tracker.autorun(() => {
    if (Meteor.userId()) {
      queryWatcher.startPolling(5000);
    } else {
      queryWatcher.stopPolling();
    }
  });
});

export { withData };
export default { withData };
