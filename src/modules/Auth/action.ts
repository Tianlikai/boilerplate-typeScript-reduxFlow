import { ActionCreator } from "../../packages/flux-payload-action";

const NAMESPACE = "Auth";

export const updateAuthenticated = ActionCreator<{ isAuthenticated: boolean }>(
  `${NAMESPACE}/updateAuthenticated`,
);
