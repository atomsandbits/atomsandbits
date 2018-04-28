import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const runCalculation = gql`
  mutation runCalculation($input: RunCalculationInput!) {
    runCalculation(input: $input) {
      calculation {
        id
        geometries {
          id
        }
      }
    }
  }
`;

const withDeleteTag = graphql(runCalculation, {
  props: ({ ownProps, mutate }) => ({
    submitCalculation: ({ input }) =>
      mutate({ variables: { input } })
        .then(({ data }) => {
          const calculationId = data.runCalculation.calculation.id;
          const geometryId = data.runCalculation.calculation.geometries[0].id;
          ownProps.history.push(
            `/geometry/${geometryId}/calculation/${calculationId}`
          );
        })
        .catch(error => {
          console.error('there was an error sending the query', error);
        }),
  }),
});

export { withDeleteTag };
export default withDeleteTag;
