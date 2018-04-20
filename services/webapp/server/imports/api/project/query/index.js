import { getProject } from '/server/imports/db/projects/read';

const Query = {
  project: (root, args, context) => {
    const { id } = args.input;
    const { userId } = context;
    return getProject({ projectId: id, userId });
  },
};

export default Query;
