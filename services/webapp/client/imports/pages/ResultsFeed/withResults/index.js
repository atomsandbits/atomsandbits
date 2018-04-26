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
        project {
          id
          createdAt
          completed
          geometries {
            id
            molecularFormula
          }
          layers {
            type
            parameters {
              calculation {
                type
                method
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

const countQuery = gql`
  query {
    userResults {
      totalCount
    }
  }
`;

const withResults = graphql(dataQuery, {
  options: {
    fetchPolicy: 'network-only',
    pollInterval: 6000,
  },
});

const queryWatcher = apolloClient.watchQuery({
  query: countQuery,
  fetchPolicy: 'network-only',
});
Meteor.startup(() => {
  Tracker.autorun(() => {
    if (Meteor.userId()) {
      queryWatcher.startPolling(3000);
    } else {
      queryWatcher.stopPolling();
    }
  });
});

export { withResults };
export default { withResults };
