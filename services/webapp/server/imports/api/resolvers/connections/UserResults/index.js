const UserResultsConnection = {
  pageInfo() {
    return {
      hasNextPage: true,
      hasPreviousPage: false,
    };
  },
  edges({ userId }) {
    return [
      {
        node: {
          id: 'abc123',
        },
        cursor: 'abc123',
      },
    ];
  },
  results() {
    return [
      {
        id: 'abc123',
      },
    ];
  },
  totalCount() {
    return 500;
  },
};

export { UserResultsConnection };
export default { UserResultsConnection };
