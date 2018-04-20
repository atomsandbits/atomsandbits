const Filter = () => [
  `enum FilterType {
    SEARCH
    SIMILARITY
    MASS
  }
  input Filter {
    type: FilterType!
    search: String
    minimum: Float
    maximum: Float
    level: Int
  }`,
];

const PaginationInput = () => [
  `enum Sort {
    CREATED
    MASS
  }
  enum Direction {
    ASC
    DESC
  }
  input Ordering {
    sort: Sort = CREATED
    direction: Direction = ASC
  }

  input PaginationInput {
    filters: [Filter]
    orderBy: Ordering
    skip: Int = 0
    limit: Int = 30
    # after: String
    # before: String
    # last: Int
    # first: Int
  }`,
  Filter,
];

export { Filter, PaginationInput };
export default { Filter, PaginationInput };
