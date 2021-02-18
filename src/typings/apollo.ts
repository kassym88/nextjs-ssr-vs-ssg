import { AppProps } from 'next/app';
import { ApolloCache, NormalizedCacheObject } from '@apollo/client';

export type ApolloState = ApolloCache<NormalizedCacheObject>;

export interface ExtendedAppProps extends AppProps {
  pageProps: {
    initialApolloState?: ApolloState;
  };
}
