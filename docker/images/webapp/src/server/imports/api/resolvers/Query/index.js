import { getGeometry } from '/server/imports/db/geometries/read';
import { getCalculation } from '/server/imports/db/calculations/read';
import { getResults } from '/server/imports/db/results/read';

const Query = {
  say: () => 'hello world',
  geometry: (root, args, context) => {
    const { id } = args.input;
    const { userId } = context;
    return getGeometry({ geometryId: id, userId });
  },
  calculation: (root, args, context) => {
    const { id } = args.input;
    const { userId } = context;
    return getCalculation({ calculationId: id, userId });
  },
  geometries: (root, args, context) => {},
  project: (root, args, context) => {},
  results: (root, args, context) => {
    const { userId } = context;
    const { limit, skip, search, sortBy, sortOrder } = args.input || {};
    return getResults({ userId, limit, skip, search, sortBy, sortOrder });
  },
};

export { Query };
export default { Query };
