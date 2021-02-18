import { gql } from '@apollo/client';

export const SHIPS_QUERY = gql`
  query GetLaunches {
    launchesPast(limit: 1) {
      ships {
        id
        name
        home_port
        image
      }
    }
  }
`;
