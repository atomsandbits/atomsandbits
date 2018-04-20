import { getCalculation } from '/server/imports/db/calculations/read';
import { getProject } from '/server/imports/db/projects/read';
import { Calculations } from '/server/imports/db';

const Result = {
  calculation(result) {
    const { calculationId } = result;
    if (calculationId) return getCalculation({ calculationId });
  },
  project(result) {
    const { projectId } = result;
    if (projectId) return getProject({ projectId });
  },
};

export { Result };
export default { Result };
