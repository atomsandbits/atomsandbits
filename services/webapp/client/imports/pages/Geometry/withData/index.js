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
            error
          }
          forces {
            force
            label
            running
            error
          }
          freeEnergies {
            freeEnergy
            label
            running
            error
          }
          optimizations {
            geometries
            energies
            label
            running
            error
          }
          conformerSearches {
            geometries
            energies
            label
            running
            error
          }
          harmonicSpectra {
            frequencies
            intensities
            optimizedGeometry
            label
            running
            error
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
          pollInterval: 2000,
        };
      },
    }
  )
);

export { withData };
export default { withData };
