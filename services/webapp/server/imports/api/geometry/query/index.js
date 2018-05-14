import { getGeometry } from '/server/imports/db/geometries/read';
import { Geometries } from '/server/imports/db/geometries';

const Query = {
  geometry: (root, args, context) => {
    const { id } = args.input;
    const { userId } = context;
    return getGeometry({ geometryId: id, userId });
  },
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
      edges: geometry.get().map((geometry) => ({
        node: geometry,
        cursor: geometry.id,
      })),
      geometries: geometry.get(),
      totalCount: geometry.count(),
    };
  },
};

export default Query;
