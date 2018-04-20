import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const runProject = gql`
  mutation runProject($input: RunProjectInput!) {
    runProject(input: $input) {
      project {
        id
      }
    }
  }
`;

const withRunProjectMutation = graphql(runProject, {
  props: ({ ownProps, mutate }) => ({
    runProjectMutation: ({ input }) =>
      mutate({ variables: { input } })
        .then(({ data }) => {
          console.log(data);
          const projectId = data.runProject.project.id;
          ownProps.history.push(`/project/${projectId}`);
        })
        .catch(error => {
          console.log('there was an error sending the query', error);
        }),
  }),
});

export { withRunProjectMutation };
export default withRunProjectMutation;
