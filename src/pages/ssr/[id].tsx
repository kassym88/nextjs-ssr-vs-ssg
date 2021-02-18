import { initializeApollo } from '@lib';
import { LAUNCHES_QUERY, launchesParamSelector } from '@queries';
import useTranslation from 'next-translate/useTranslation';
import { TestComponent } from '@components/test-component';
import styles from './ship.module.scss';

interface ShipProps {
  id: string
}

const Ship = ({id}: ShipProps) => {
  const {t} = useTranslation('common');

  return (
    <>
      <p className={styles.ship}>{t('SSR')}</p>
      <div>
        {t('common:ship')} <span>{id}</span>
      </div>
      <TestComponent label={id}/>
    </>
  )
};

export async function getServerSideProps(context: {query: {id: string}}) {
  const apolloClient = initializeApollo();
  const { limit, sort } = launchesParamSelector({});

  await apolloClient.query({
    query: LAUNCHES_QUERY,
    variables: { limit, sort },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id: context.query.id
    }
  }
}

export default Ship;
