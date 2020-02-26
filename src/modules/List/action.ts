import { AsyncGroupCreator } from "../../packages/flux-payload-action";

const NAMESPACE = "LIST";

export const searchActions = AsyncGroupCreator<void, void, void>(
  `${NAMESPACE}/initList`,
);
