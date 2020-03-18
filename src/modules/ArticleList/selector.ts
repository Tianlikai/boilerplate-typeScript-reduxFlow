import { createSelector } from "reselect";
import { articleListReducer } from "./reducer";
import { rootSelectorFactory } from "../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "ArticleList";

export const rootSelector = rootSelectorFactory<typeof articleListReducer>(
  NAMESPACE,
);

export const articleListSelector = createSelector(
  rootSelector,
  state => state.articleList,
);

export const articleItemLayoutCacheSelector = createSelector(
  rootSelector,
  state => state.articleItemLayoutCache,
);
