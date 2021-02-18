import { ReactElement, useEffect, useState } from 'react';
import { Router } from 'next/router';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '@lib';
import { ExtendedAppProps } from '@typings/apollo';
import { Loader } from '@components/loader';

import '../styles/globals.scss';
import '../styles/responsive.scss';
import { Layout } from '../components/layout';

function MyApp({
  Component,
  pageProps: { initialApolloState, ...pageProps },
}: ExtendedAppProps): ReactElement {
  const apolloClient = useApollo(initialApolloState);

  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setPageLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      setPageLoading(false);
    });
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>{pageLoading ? <Loader /> : <Component {...pageProps} />}</Layout>
    </ApolloProvider>
  );
}

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
