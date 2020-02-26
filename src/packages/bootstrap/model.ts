import { AnyAction } from "redux";
import { Effect } from "redux-saga/effects";

export interface ModuleParam<
  State,
  Actions,
  SubModules extends Array<MyModule<any, any, SubModules>> | undefined
> {
  namespace: string;
  reducer?: (state: State | undefined, action: Actions) => State;
  saga?: () => IterableIterator<Effect>;
  subModules?: SubModules;
}

/* eslint-disable */
export interface MyModule<
  State = any,
  Actions = AnyAction,
  SubModules extends Array<MyModule<any, any, SubModules>> | undefined = any
> extends ModuleParam<State, Actions, SubModules> {}
