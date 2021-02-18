import { TestAction, TestState } from './types';
import { SET_TEST_DATA } from './actions';

const initialState = {
  data: { launchesPast: [] },
};
export function reducer(
  state: TestState = initialState,
  action: TestAction,
): TestState {
  if (action.type === SET_TEST_DATA) {
    return {
      ...state,
      data: action.payload.data,
    };
  }

  return state;
}
