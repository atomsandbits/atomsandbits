import { Results } from '/server/imports/db/results';

const Query = {
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
      edges: userResults.get().map((userResult) => ({
        node: userResult,
        cursor: userResult.id,
      })),
      results: userResults.get(),
      totalCount: userResults.count(),
    };
  },
};

export default Query;
