import { Geometries } from '/server/imports/db';

class GeometriesMapper {
  constructor(options) {
    this.options = options;
    this.limit = options.first || (options.last || 30);
    // console.log(this);
    this._setupQuery();
  }
  _setupQuery() {
    const {
      first,
      last,
      limit,
      after,
      orderBy,
      filters,
      userId,
    } = this.options;

    /* Limit and Sorting */
    const { sort, direction } = orderBy || {
      sort: 'CREATED',
      direction: 'ASC',
    };
    const mongoSortBy =
      sort === 'CREATED' ? 'createdAt' : sort === 'MASS' ? 'mass' : 'createdAt';
    let mongoSortDirection = direction === 'DESC' ? -1 : 1;
    mongoSortDirection =
      mongoSortBy === 'createdAt'
        ? mongoSortDirection * -1 // reverse for time
        : mongoSortDirection;
    const mongoSort = {
      [mongoSortBy]: mongoSortDirection,
    };

    /* Filters */
    const mongoQuery = {};
    if (filters && filters[0]) {
      filters.forEach(filter => {
        if (filter.type === 'MASS') {
          mongoQuery.mass = {
            $gte: filter.minimum,
            $lte: filter.maximum,
          };
        }
        if (filter.type === 'SEARCH') {
          mongoQuery.molecularFormula = filter.search.toUpperCase();
        }
      });
    }

    /* Skip/Pagination */
    // const comparator = mongoSortDirection === -1 ? '$lt' : '$gt';
    let skip = 0;
    if (after) {
      const geometryIds = Geometries.find(mongoQuery, {
        sort: mongoSort,
        fields: {
          _id: 1,
        },
      })
        .fetch()
        .map(geometry => geometry._id);
      skip = geometryIds.indexOf(after) + 1;
    }

    this._cursor = Geometries.find(mongoQuery, {
      sort: mongoSort,
      limit,
      skip,
    });
  }
  _fetch() {
    /* Fetch */
    const geometries = this._cursor.fetch();
    this._geometries = geometries.map(geometry =>
      this._convertToGraph(geometry)
    );
  }
  _convertToGraph({
    _id,
    atomicCoords,
    molecularFormula,
    mass,
    images,
    users,
    createdAt,
  }) {
    return {
      id: _id,
      atomicCoords: atomicCoords,
      molecularFormula: molecularFormula,
      atomCount: atomicCoords.split('\n').length,
      mass: mass,
      mediumImage: images ? images['512'] : null,
      tags: users[0] ? users[0].tags : [],
      createdAt: createdAt,
    };
  }
  get() {
    if (!this._geometries) {
      this._fetch();
    }
    return this._geometries;
  }
  first() {
    const geometries = this.get();
    const firstGeometry = geometries[0] || {};
    return firstGeometry;
  }
  last() {
    const geometries = this.get();
    const lastGeometry = geometries[geometries.length - 1] || {};
    return lastGeometry;
  }
  count() {
    return this._cursor.count();
  }
  hasNextPage() {
    return !(this.get().length < this.limit);
  }
  hasPreviousPage() {
    return false;
  }
}

export { GeometriesMapper as Geometries };
export default GeometriesMapper;
