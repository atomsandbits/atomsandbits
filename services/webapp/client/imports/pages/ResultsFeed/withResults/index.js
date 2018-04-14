import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

import apolloClient from '/client/imports/apollo-client';

const dataQuery = gql`
  query {
    userResults {
      results {
        id
        type
        createdAt
        project {
          id
        }
        calculation {
          id
          createdAt
          completed
          parameters {
            type
            method
          }
          geometries {
            id
            molecularFormula
          }
        }
      }
      totalCount
    }
  }
`;

const withResults = graphql(dataQuery);

const queryWatcher = apolloClient.watchQuery({
  query: dataQuery,
  fetchPolicy: 'network-only',
});
Meteor.startup(() => {
  Tracker.autorun(() => {
    if (Meteor.userId()) {
      queryWatcher.startPolling(6000);
    } else {
      queryWatcher.stopPolling();
    }
  });
});

export { withResults };
export default { withResults };
