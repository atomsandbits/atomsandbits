import moment from 'moment';
import { Geometries } from '/server/imports/db';
// import memoize from 'lodash/memoize';

let countedAt = {};
let counts = {};

const getCount = (query) => {
  let currentTime = moment().valueOf();
  let lastUpdate = countedAt[query];
  let lastCount = counts[query];
  // console.log(lastUpdate);
  // console.log(currentTime);
  if (!lastUpdate || currentTime - 3 * 60 * 1000 > lastUpdate) {
    // console.log('fetching count');
    lastCount = Geometries.find(JSON.parse(query)).count();
    countedAt[query] = currentTime;
  } else {
    // console.log('returning count from cache');
  }
  counts[query] = lastCount;
  return lastCount;
};

class GeometriesMapper {
  constructor(options) {
    this.options = options;
    // this.options.limit = options.first || (options.last || 30);
    // console.log(this);
    this._setupQuery();
  }
  _setupQuery() {
    const {
      // first,
      // last,
      limit,
      skip,
      // after,
      orderBy,
      filters,
      // userId,
    } = this.options;

    /* Sorting */
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
      filters.forEach((filter) => {
        if (filter.type === 'MASS') {
          mongoQuery.mass = {
            $gte: filter.minimum,
            $lte: filter.maximum,
          };
        }
        if (filter.type === 'SEARCH') {
          const elements = filter.search.match(/[a-zA-Z]+/g) || [];
          const elementCounts = filter.search.match(/\d+/g) || [];
          const search = elements
            .map(
              (element, index) =>
                `${element.charAt(0).toUpperCase() +
                  element.slice(1).toLowerCase()}${elementCounts[index] || ''}`
            )
            .join('');
          console.log('search', search);
          mongoQuery.molecularFormula = search;
        }
      });
    }

    /* Skip/Pagination */
    // const comparator = mongoSortDirection === -1 ? '$lt' : '$gt';
    // let skip = 0;
    // if (after) {
    //   const geometryIds = Geometries.find(mongoQuery, {
    //     sort: mongoSort,
    //     fields: {
    //       _id: 1,
    //     },
    //   })
    //     .fetch()
    //     .map(geometry => geometry._id);
    //   skip = geometryIds.indexOf(after) + 1;
    // }

    this._cursor = Geometries.find(mongoQuery, {
      sort: mongoSort,
      limit,
      skip,
      fields: {
        _id: 1,
        atomicCoords: 1,
        molecularFormula: 1,
        mass: 1,
        users: 1,
        createdAt: 1,
      },
    });
    this.count = () => getCount(JSON.stringify(mongoQuery));
  }
  _fetch() {
    /* Fetch */
    const geometries = this._cursor.fetch();
    this._geometries = geometries.map((geometry) =>
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
    const user = users.find((user) => this.options.userId === user._id);
    return {
      id: _id,
      atomicCoords: atomicCoords,
      molecularFormula: molecularFormula,
      atomCount: atomicCoords.split('\n').length,
      mass: mass,
      tags: user ? user.tags : users[0] ? users[0].tags : [],
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
  // count() {
  //   let currentTime = moment().valueOf();
  //   console.log(lastUpdate);
  //   console.log(currentTime);
  //   if (!lastUpdate || currentTime - 3 * 60 * 1000 > lastUpdate) {
  //     console.log('fetching count');
  //     lastCount = this._cursor.count();
  //     lastUpdate = currentTime;
  //   } else {
  //     console.log('returning count from cache');
  //   }
  //   return lastCount;
  // }
  hasNextPage() {
    return !(this.get().length < this.options.limit);
  }
  hasPreviousPage() {
    return false;
  }
}

export { GeometriesMapper as Geometries };
export default GeometriesMapper;
