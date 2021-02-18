import useTranslation from 'next-translate/useTranslation';
import { initializeApollo } from '@lib';
import { LAUNCHES_QUERY, launchesParamSelector, SHIPS_QUERY } from '@queries';
// import { SHIPS_QUERY } from '@queries';
import { TestComponent } from '@components/test-component';

import fs from 'fs'
import path from 'path'

import styles from './game.module.scss';

interface GameProps {
  id: string | number
}

const Game = ({id}: GameProps) => {
  const {t} = useTranslation('common');

  return (
    <>
      <p className={styles.game}>{t('SSG')}</p>
      <div>
        {t('common:game')} <span>{id}</span>
      </div>
      <TestComponent label={id.toString()}/>
    </>
  )
};

export async function getStaticPaths () {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SHIPS_QUERY,
    variables: { limit: 100, sort: '' },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const i18nConfig = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), 'i18n.json'),
    'utf8'
  ));

  console.log(111, i18nConfig);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const locales = i18nConfig && i18nConfig.locales
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ? i18nConfig.locales
    : [];

  // const locales = ['en', 'ru'];

  const ships = apolloClient.extract();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/naming-convention,@typescript-eslint/no-unsafe-assignment,no-underscore-dangle
  const paths = Object.keys(ships)
    .map(key =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      locales.map((locale: string) => ({
        params: {
          id: ships[key]?.id
        },
        locale
      }))
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .flat()
    .filter((el: { params: { id: string } }) => el.params.id);

  console.log(888, paths);

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}: {params: {id: string | number}}) {
  const apolloClient = initializeApollo();
  const { limit, sort } = launchesParamSelector({});

  try {
    await apolloClient.query({
      query: LAUNCHES_QUERY,
      variables: { limit, sort },
    });
  }
  catch (e) {
    console.log('Game/[id].tsx - error querying apolloClient');
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id: params.id
    }
  }
}

export default Game;
