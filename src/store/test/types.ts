import { ActionWithPayload } from '../../typings/redux';

export interface LaunchPayload {
  id: number;
  links: { video_link: string };
  mission_name: string;
  launch_date_local: string;
}

export type ItemsType = Array<LaunchPayload>;

export interface TestActionPayload {
  data: {
    launchesPast: ItemsType;
  };
}

export type TestAction = ActionWithPayload<TestActionPayload>;

export type TestState = {
  data: {
    launchesPast: ItemsType;
  };
};

export interface TestSliceState {
  test: TestState;
}
