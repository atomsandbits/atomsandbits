import { createApolloClient } from 'meteor/apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const root = typeof window !== 'undefined' ? window : global;

const cache = new InMemoryCache({}).restore(window.__APOLLO_STATE__);
persistCache({
  cache,
  storage: root.localStorage,
});

const client = createApolloClient({
  cache,
  ssrForceFetchDelay: 100,
});

export { client };
export default client;
