import { getGeometry } from '/server/imports/db/geometries/read';
import { getCalculation } from '/server/imports/db/calculations/read';
import { getResults } from '/server/imports/db/results/read';

import { Geometries } from '/server/imports/db/geometries';
import { Results } from '/server/imports/db/results';

const Query = {
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
  project: (root, args, context) => {},
  allGeometries: (root, args, context) => {
    const { userId } = context;
    const { skip, limit, first, after, last, before, orderBy, filters } =
      args.input || {};
    const geometry = new Geometries({
      userId,
      first,
      after,
      skip,
      limit,
      last,
      before,
      orderBy,
      filters,
    });
    return {
      pageInfo: {
        hasNextPage: geometry.hasNextPage(),
        hasPreviousPage: geometry.hasPreviousPage(),
        startCursor: geometry.first().id,
        endCursor: geometry.last().id,
        skip,
        limit,
      },
      edges: geometry.get().map(geometry => ({
        node: geometry,
        cursor: geometry.id,
      })),
      geometries: geometry.get(),
      totalCount: geometry.count(),
    };
  },
  userResults: (root, args, context) => {
    const { userId } = context;
    const { skip, limit, first, after, last, before, orderBy, filters } =
      args.input || {};
    const userResults = new Results({
      after,
      before,
      filters,
      first,
      last,
      limit,
      orderBy,
      skip,
      userId,
    });
    return {
      pageInfo: {
        hasNextPage: userResults.hasNextPage(),
        hasPreviousPage: userResults.hasPreviousPage(),
        startCursor: userResults.first().id,
        endCursor: userResults.last().id,
        skip,
        limit,
      },
      edges: userResults.get().map(userResult => ({
        node: userResult,
        cursor: userResult.id,
      })),
      results: userResults.get(),
      totalCount: userResults.count(),
    };
  },
};

export { Query };
export default { Query };
