import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

const withProject = compose(
  graphql(
    gql`
      query($projectInput: ProjectInput!) {
        project(input: $projectInput) {
          id
          geometries {
            id
            atomicCoords
          }
          layers {
            id
            type
            parameters {
              limit
              sort
              calculation {
                type
                method
                network
              }
            }
            output {
              geometry {
                id
                atomicCoords
              }
              geometry_ {
                id
                atomicCoords
              }
              geometry__ {
                id
                atomicCoords
              }
              energy
              energy_
              energy__
              force
              force_
              freeEnergy
              freeEnergy_
              frequency_
              frequency__
              intensity_
              intensity__
            }
            completed
          }
        }
      }
    `,
    {
      options: ({ match }) => {
        const { projectId } = match.params;
        return {
          variables: {
            projectInput: { id: projectId },
          },
          pollInterval: 3000,
        };
      },
    }
  )
);

export { withProject };
export default { withProject };
