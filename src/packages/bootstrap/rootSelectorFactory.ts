import { AnyAction } from "redux";

export const rootSelectorFactory = <
  ReducerType extends (state: any, action: AnyAction) => any
>(
  id: string,
) => (state: any) => {
  return state[id] as ReturnType<ReducerType>;
};
