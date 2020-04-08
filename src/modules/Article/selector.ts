import { ArticleReducer } from "./reducer";
import { rootSelectorFactory } from "../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "Article";

export const rootSelector = rootSelectorFactory<typeof ArticleReducer>(
  NAMESPACE,
);
