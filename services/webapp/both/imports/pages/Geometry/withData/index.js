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
          molecularFormula
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
          relaxedScans {
            geometries
            energies
            distances
            label
            running
            error
          }
        }
      }
    `,
    {
      options: ({ match }) => {
        const { geometryId, calculationId } = match.params;
        return {
          variables: {
            geometryInput: { id: geometryId, calculationId },
          },
          fetchPolicy: 'cache-and-network',
          pollInterval: typeof window === 'undefined' ? null : 3000,
        };
      },
    }
  )
);

export { withData };
export default { withData };
