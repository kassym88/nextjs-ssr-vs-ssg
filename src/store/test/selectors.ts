import { TestSliceState, ItemsType } from './types';

export function testDataSelector(state: TestSliceState): ItemsType {
  return state.test.data.launchesPast;
}
