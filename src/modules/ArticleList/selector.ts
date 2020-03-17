import { map } from "lodash";
import { createSelector } from "reselect";
import { articleListReducer } from "./reducer";
import { rootSelectorFactory } from "../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "ArticleList";

export const rootSelector = rootSelectorFactory<typeof articleListReducer>(
  NAMESPACE,
);

export const articleListSelector = createSelector(rootSelector, state => {
  const { articleList, pageNumber } = state;
  return map(articleList, article => {
    return { ...article, id: parseInt(`${pageNumber - 2}${article.id}`) };
  });
});
