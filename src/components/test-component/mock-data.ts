import { LAUNCHES_QUERY } from '../../queries';

export const variables = {
  limit: 10,
  sort: 'mission_name',
};

export const mocks = [
  {
    request: {
      query: LAUNCHES_QUERY,
      variables,
    },
    result: {
      data: {
        launchesPast: [
          {
            id: 1,
            mission_name: 'test-name-1',
            launch_date_local: '2020-10-24T11:31:00-04:00',
            links: {
              video_link: 'test-link-1',
            },
          },
          {
            id: 2,
            mission_name: 'test-name-2',
            launch_date_local: '2020-10-24T11:31:00-04:00',
            links: {
              video_link: 'test-link-2',
            },
          },
        ],
      },
    },
  },
];