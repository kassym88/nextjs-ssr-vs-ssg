import toInteger from 'lodash/toInteger';
import { gql } from '@apollo/client';

import { DEFAULT_LIMIT, DEFAULT_SORT } from '../constants';

const LAUNCHES_QUERY = gql`
  query GetLaunches($limit: Int!, $sort: String!) {
    launchesPast(limit: $limit, sort: $sort) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        mission_patch
      }
      rocket {
        rocket_name
      }
    }
  }
`;

type LaunchesQuery = {
  sort?: string;
  limit?: string;
}

export type RequiredLaunchesQuery = {
  sort: string,
  limit: number
};

function launchesParamSelector(query: LaunchesQuery): RequiredLaunchesQuery {
  const { limit = DEFAULT_LIMIT, sort = DEFAULT_SORT } = query;

  return { limit: toInteger(limit), sort };
}

export {
  LAUNCHES_QUERY,
  launchesParamSelector,
};
