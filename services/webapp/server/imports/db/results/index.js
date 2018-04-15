import { Calculations, Projects, UserResults } from '/server/imports/db';

class Results {
  constructor(options) {
    this.options = options;
    this.options.limit = options.first || (options.last || 30);
  }
  _fetch() {
    const { first, last, orderBy, userId } = this.options;
    const { sort, direction } = orderBy || {
      sort: 'CREATED',
      direction: 'DESC',
    };
    const limit = this.limit;
    const mongoSortBy =
      sort === 'CREATED'
        ? 'createdAt'
        : sort === 'MASS' ? 'geometry.mass' : 'createdAt';
    const mongoSortDirection = direction === 'DESC' ? -1 : 1;
    const mongoSort = {
      [mongoSortBy]: mongoSortDirection,
    };
    const calculations = Calculations.find(
      { 'users._id': userId },
      { limit, sort: mongoSort, fields: { _id: 1, 'users.$': 1 } }
    ).fetch();
    const results = UserResults.find(
      { userId },
      { sort: mongoSort, limit }
    ).fetch();
    this._results = results.map(result => this._convertResultToGraph(result));
  }
  _convertResultToGraph({ _id, createdAt, calculationId, projectId, type }) {
    return {
      id: _id,
      type: type.toUpperCase(),
      calculationId,
      projectId,
      createdAt,
    };
  }
  get() {
    if (!this._results) {
      this._fetch();
    }
    return this._results;
  }
  first() {
    const results = this.get();
    const firstResult = results[0] || {};
    return firstResult;
  }
  last() {
    const results = this.get();
    const lastResult = results[results.length - 1] || {};
    return lastResult;
  }
  count() {
    const { userId } = this.options;
    return UserResults.find({ userId }).count();
  }
  hasNextPage() {
    return true;
  }
  hasPreviousPage() {
    return false;
  }
}

export { Results };
export default Results;
