import { Action } from 'redux';

export interface ActionWithPayload<TPayload> extends Action<string> {
  payload: TPayload
}

export type Reducer<TState, TAction> = (state: TState, action: TAction) => TState;
