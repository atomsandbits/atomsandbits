// import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
            imagePlaceholder
          }
        }
        project {
          id
          createdAt
          completed
          geometries {
            id
            molecularFormula
            imagePlaceholder
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

const withResults = graphql(dataQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
    pollInterval: typeof window === 'undefined' ? null : 10000,
  },
});

// const countQuery = gql`
//   query {
//     userResults {
//       totalCount
//     }
//   }
// `;
//
// if (Meteor.isClient) {
//   Meteor.startup(async () => {
//     import apolloClient from '/client/imports/apollo-client';
//     const queryWatcher = apolloClient.watchQuery({
//       query: countQuery,
//       fetchPolicy: 'network-only',
//     });
//     Meteor.startup(() => {
//       Tracker.autorun(() => {
//         if (Meteor.userId()) {
//           queryWatcher.startPolling(10000);
//         } else {
//           queryWatcher.stopPolling();
//         }
//       });
//     });
//   });
// }

export { withResults };
export default { withResults };
