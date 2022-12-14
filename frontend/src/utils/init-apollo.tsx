import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { debug } from 'debug';
import fetch from 'isomorphic-unfetch';

const logger = debug('app:initApollo');
logger.log = console.log.bind(console);

export const IS_SERVER = typeof window === 'undefined';
export const GRAPHQL_URL = 'http://localhost:5001/graphql';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;


function create(
  initialState: any,
  { getToken }: any
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: !IS_SERVER, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      createHttpLink({
        uri: GRAPHQL_URL,
        headers: {
        //   // HTTP Header:  Cookie: <cookiename>=<cookievalue>
          Cookie: `connect.sid=${getToken()['connect.sid']};lang=${getToken()['lang']}`,
        },
        credentials: 'include',
        fetch,
      })
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: !IS_SERVER,
  });
}

export function initApollo(
  initialState: any,
  options: any
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (IS_SERVER) {
    return create(initialState, options);
  }

  // Reuse client at module scope on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
