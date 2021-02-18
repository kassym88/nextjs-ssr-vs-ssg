import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

import { ApolloState } from '../typings/apollo';

type ApolloClientType = ApolloClient<NormalizedCacheObject>;

let apolloClient: ApolloClientType;

export function createApolloClient(): ApolloClientType {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://api.spacex.land/graphql/',
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: ApolloState): ApolloClientType {
  const localApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = localApolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    localApolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return localApolloClient;
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = localApolloClient;
  }
  return localApolloClient;
}

export function useApollo(initialState?: ApolloState): ApolloClientType {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
