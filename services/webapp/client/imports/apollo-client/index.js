import { createApolloClient } from 'meteor/apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const cache = new InMemoryCache({});

persistCache({
  cache,
  storage: window.localStorage,
});

const client = createApolloClient({ });

export { client };
export default client;
