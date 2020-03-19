import { ActionCreator } from "../../../packages/flux-payload-action";

const NAMESPACE = "Common/Client";

export const onResizeAction = ActionCreator<{ innerHeight: number }>(
  `${NAMESPACE}/onResize`,
);
