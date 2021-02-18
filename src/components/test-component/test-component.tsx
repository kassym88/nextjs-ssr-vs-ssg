import { ReactElement } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { LAUNCHES_QUERY, launchesParamSelector } from '@queries';
import styles from './test-component.module.scss';

export interface IProps {
  readonly label: string;
}

interface Launch {
  id: number;
  links: { video_link: string };
  mission_name: string;
  launch_date_local: string;
}

interface LaunchesType {
  launchesPast: Array<Launch>;
}

function TestComponent({ label }: IProps): ReactElement {
  const { query } = useRouter();
  const { limit, sort } = launchesParamSelector(query);
  const {t} = useTranslation();

  const { data: launches, loading: isLaunchesLoading, refetch, networkStatus } = useQuery<LaunchesType>(
    LAUNCHES_QUERY,
    {
      variables: { limit, sort },
      notifyOnNetworkStatusChange: true
    }
  );

  if (networkStatus === NetworkStatus.refetch) return <div>Refetching!</div>;

  return (
    <div className={styles.component}>
      <h1>{label}</h1>
      {isLaunchesLoading ? (
        <h1>Loading!!!</h1>
      ) : (
        <>
          <button type="button" onClick={() => refetch()}>{t('common:refetch')}</button>
          <div className={styles.grid}>
            {launches?.launchesPast.map((launch) => (
              <a
                key={launch.id}
                href={launch.links.video_link}
                className={styles.card}
              >
                <h3 className={styles.header}>{launch.mission_name}</h3>
                <p className={styles.paragraph}>
                  <strong>Launch Date: </strong>
                  {new Date(launch.launch_date_local).toLocaleDateString('en-US')}
                </p>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TestComponent;
