import { createSelector } from "reselect";
import { Article } from "./interface";
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

export const articleMapSelector = createSelector(rootSelector, state => {
  const map: { [id: number]: Article } = {};
  state.articleList.forEach(article => (map[article.id] = article));
  return map;
});
