import { ReactElement, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { launchesParamSelector, SHIPS_QUERY } from '@queries';
import { initializeApollo } from '@lib';
// import { TestComponent } from '../components/test-component';
import { useRouter } from 'next/router';
import { NetworkStatus, useQuery } from '@apollo/client';
import filter from 'lodash/filter';
import { Loader } from '@components/loader';
import styles from '@pages/ssg-catalog/catalog.module.scss';
import Image from 'next/image';
import { Launch, LaunchesType, Ships } from '../models/ship';

function Home(): ReactElement {
  const { t, lang } = useTranslation();
  const router = useRouter();

  const { data: launches, refetch, networkStatus } = useQuery<LaunchesType>(
    SHIPS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    },
  );

  const ships = useMemo(() => {
    const tempShips = launches?.launchesPast.reduce(
      (acc: Ships, currVal: Launch) => [...acc, ...currVal.ships],
      [],
    );
    return filter(tempShips, 'image');
  }, [launches?.launchesPast]);

  const handleClick = (path: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`/ssr/${path}`, undefined, {locale: lang});
  };

  if (networkStatus === NetworkStatus.refetch) {
    return <Loader />;
  }

  return (
    <>
      <h1>Server side rendering</h1>
      <button
        type="button"
        onClick={() => refetch()}
        className={styles.synchronize}
      >
        {t('common:refetch')}
      </button>
      <div className={styles.cardContainer}>
        {ships.map((item, idx) => (
          <div key={idx} className={styles.ship} onClick={() => handleClick(item.id)}>
            <Image
              src={item?.image}
              width={320}
              height={154}
              className={styles.image}
              alt={item.name}
            />
            <div className={styles.cardBody}>
              <span>
                <b>{item.home_port}</b>
              </span>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo();
  const { limit, sort } = launchesParamSelector(query);

  await apolloClient.query({
    query: SHIPS_QUERY,
    variables: { limit, sort },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Home;
