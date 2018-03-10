import { getCalculation } from '/server/imports/db/calculations/read';
import { getProject } from '/server/imports/db/projects/read';
import { Calculations } from '/server/imports/db';

const Result = {
  calculation(result) {
    const { calculationId } = result;
    return getCalculation({ calculationId });
  },
  project(result) {
    const { projectId } = result;
    // return getProject({ projectId });
  },
  createdAt(result, context) {
    const { calculationId, projectId } = result;
    const { userId } = context;
    return Calculations.findOne(
      { _id: calculationId, 'users._id': userId },
      { fields: { 'users.createdAt': 1 } }
    ).users[0].createdAt;
  },
};

export { Result };
export default { Result };
