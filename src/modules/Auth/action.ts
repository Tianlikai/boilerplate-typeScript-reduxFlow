import { ActionCreator } from "../../packages/flux-payload-action";

const NAMESPACE = "Auth";

export const updateAuthenticatedAction = ActionCreator<{
  isAuthenticated: boolean;
}>(`${NAMESPACE}/updateAuthenticated`);
