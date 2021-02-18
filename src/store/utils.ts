import { HYDRATE } from 'next-redux-wrapper';
import { Reducer, Action, ActionCreator } from 'redux';

import { ActionWithPayload } from '../typings/redux';

export function actionCreator<P>(
  type: string,
): ActionCreator<ActionWithPayload<P>> {
  return Object.assign((payload: P) => ({ type, payload }), { type });
}

interface HydrateAction<TState> extends Action<string> {
  payload: TState;
}
export function withHydrate<TState, TAction extends Action<string>>(
  reducer: Reducer<TState, TAction>,
): Reducer<TState, TAction | HydrateAction<TState>> {
  return (
    state: TState | undefined,
    action: TAction | HydrateAction<TState>,
  ): TState => {
    if (action.type === HYDRATE) {
      return (action as HydrateAction<TState>).payload;
    }

    return reducer(state, action as TAction);
  };
}
