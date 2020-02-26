import { ActionCreator } from "./ActionCreator";

export type AsyncGroupCreator<TRequest, TSuccess, TFailure> = {
  request: ActionCreator<TRequest>;
  success: ActionCreator<TSuccess>;
  failure: ActionCreator<TFailure>;
};

export const AsyncGroupCreator = <TRequest, TSuccess, TFailure>(
  groupName: string,
) => ({
  request: ActionCreator<TRequest>(`R-${groupName}@Async`),
  success: ActionCreator<TSuccess>(`S-${groupName}@Async`),
  failure: ActionCreator<TFailure>(`F-${groupName}@Async`),
});
