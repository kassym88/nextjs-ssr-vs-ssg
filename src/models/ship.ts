export interface Ship {
  id: string,
  home_port: string;
  image: string;
  name: string;
}

export type Ships = Array<Ship>;
export type Launch = { ships: Ships };

export interface LaunchesType {
  launchesPast: Array<Launch>;
}
