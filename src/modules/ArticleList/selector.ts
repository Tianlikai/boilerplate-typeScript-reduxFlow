import { articleListReducer } from "./reducer";
import { rootSelectorFactory } from "../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "ArticleList";

export const rootSelector = rootSelectorFactory<typeof articleListReducer>(
  NAMESPACE,
);
