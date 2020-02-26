import { TypedAction, Fpa, FapFactory } from "./FpaFactory";

export interface NoPayloadActionCreator {
  (): TypedAction;
  match: (action: TypedAction) => action is TypedAction;
}

export interface FluxPayloadActionCreator<Payload> {
  (payload: Payload): Fpa<Payload>;
  match: (action: TypedAction) => action is Fpa<Payload>;
}

export type ActionCreator<Payload> = { payload: Payload } extends {
  payload: void;
}
  ? NoPayloadActionCreator
  : FluxPayloadActionCreator<Payload>;

export const ActionCreator = <Payload = void>(type: string) => {
  const { create, ...etc } = FapFactory<Payload>(type);
  return Object.assign(create, etc) as ActionCreator<Payload>;
};
