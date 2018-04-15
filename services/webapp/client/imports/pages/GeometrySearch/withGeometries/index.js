import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import queryString from 'query-string';

import apolloClient from '/client/imports/apollo-client';

const dataQuery = gql`
  query($pageInput: PaginationInput!) {
    allGeometries(input: $pageInput) {
      pageInfo {
        hasNextPage
        skip
        limit
      }
      geometries {
        id
        molecularFormula
        mass
        createdAt
      }
      totalCount
    }
  }
`;

const withGeometries = graphql(dataQuery, {
  options: ({ location }) => {
    const queryParams = queryString.parse(location.search);
    let { sort, direction, mass, search } = queryParams;

    let orderBy;
    sort = sort ? sort.toUpperCase() : undefined;
    direction = direction ? direction.toUpperCase() : undefined;
    if (sort || direction) {
      orderBy = { sort, direction };
    }

    let filters;
    if (mass || search) {
      filters = [];
      if (mass)
        filters.push({
          type: 'MASS',
          minimum: Number(mass[0]),
          maximum: Number(mass[1]),
        });
      if (search)
        filters.push({
          type: 'SEARCH',
          search: search,
        });
    }
    return {
      variables: {
        pageInput: { orderBy, filters },
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    };
  },
});

export { withGeometries };
export default withGeometries;
