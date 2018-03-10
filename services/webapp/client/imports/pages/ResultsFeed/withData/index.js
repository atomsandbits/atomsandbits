import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

const withData = compose(
  graphql(
    gql`
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
            }
          }
        }
      }
    `,
    {
      options: () => ({ pollInterval: 5000 }),
    }
  )
);

export { withData };
export default { withData };
