import { combineReducers } from 'redux';

import { withHydrate } from './utils';
import { reducer as testReducer, TestAction } from './test';

export const combinedReducers = combineReducers({
  test: testReducer,
});

export type State = ReturnType<typeof combinedReducers>;

export const rootReducer = withHydrate<State, TestAction>(combinedReducers);
