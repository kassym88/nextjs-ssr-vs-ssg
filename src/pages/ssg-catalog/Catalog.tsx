import { useMemo } from 'react';
import Image from 'next/image';
import filter from 'lodash/filter';
// import { initializeApollo } from '@lib';
// import { GetStaticPropsResult } from 'next';
// import { NetworkStatus, NormalizedCacheObject, useQuery } from '@apollo/client';
import { SHIPS_QUERY } from '@queries';
import { NetworkStatus, useQuery } from '@apollo/client';
import { Loader } from '@components/loader';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router'
import styles from './catalog.module.scss';
import { Launch, LaunchesType, Ships } from '../../models/ship';

function Catalog(): JSX.Element {
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
    router.push(`/ssg/${path}`, undefined, {locale: lang});
  };

  if (networkStatus === NetworkStatus.refetch) {
    return <Loader />;
  }

  return (
    <>
      <h1>Server static generation</h1>
      <button
        type="button"
        onClick={() => refetch()}
        className={styles.synchronize}
      >
        {t('common:refetch')}
      </button>
      <div className={styles.cardContainer}>
        {ships.map((item, idx) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div key={idx} className={styles.card} onClick={() => handleClick(item.id)}>
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

// export async function getStaticProps(): Promise<
//   GetStaticPropsResult<{ initialApolloState?: NormalizedCacheObject }>
// > {
//   const apolloClient = initializeApollo();
//
//   try {
//     await apolloClient.query({
//       query: SHIPS_QUERY,
//       variables: {limit: 100, sort: ''}
//     });
//   }
//   catch (e) {
//     console.log('Catalog.tsx - error querying apolloClient');
//   }
//
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }

export default Catalog;
