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

const withCreateTag = graphql(runCalculation, {
  props: ({ ownProps, mutate }) => ({
    submitCalculation: ({ input }) =>
      mutate({ variables: { input } })
        .then(({ data }) => {
          console.log(data);
          const calculationId = data.runCalculation.calculation.id;
          const geometryId = data.runCalculation.calculation.geometries[0].id;
          ownProps.history.push(
            `/geometry/${geometryId}/calculation/${calculationId}`
          );
        })
        .catch(error => {
          console.log('there was an error sending the query', error);
        }),
  }),
});

export { withCreateTag };
export default withCreateTag;
