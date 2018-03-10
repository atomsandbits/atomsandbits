import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

const withData = compose(
  graphql(
    gql`
      query($geometryInput: GeometryInput!) {
        geometry(input: $geometryInput) {
          id
          atomicCoords
          tags
          energies {
            energy
            label
            running
          }
          forces {
            force
            label
            running
          }
          optimizations {
            geometries
            energies
            label
            running
          }
        }
      }
    `,
    {
      options: ({ match }) => {
        const { geometryId } = match.params;
        const { calculationId } = match.params;
        return {
          variables: {
            geometryInput: { id: geometryId, calculationId },
          },
          pollInterval: 5000,
        };
      },
    }
  )
);

export { withData };
export default { withData };
