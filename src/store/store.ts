import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';

import { rootReducer } from './reducers';

function makeStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

export const wrapper = createWrapper(makeStore);
