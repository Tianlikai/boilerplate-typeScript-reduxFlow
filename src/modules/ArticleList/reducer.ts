import { AnyAction } from "redux";
import update from "immutability-helper";
import { updateViewPortInfo, fetchArticleListActions } from "./action";
import { Article, ArticleItemLayout } from "./interface";
import { BUFFER_BOTTOM } from "./constant";

interface State {
  articleList: Article[];
  articleItemLayoutCache: {
    [articleId: number]: ArticleItemLayout;
  };
  loading: boolean;
  lastScroll: number;
  pageHeight: number;
  pageNumber: number;
  pageSize: number;
  total: number;
  topViewPort: number;
  bottomViewPort: number;
}

const initState: State = {
  articleList: [],
  articleItemLayoutCache: {},
  loading: false,
  lastScroll: 0,
  pageHeight: 0,
  pageNumber: 1,
  pageSize: 20,
  total: 0,
  topViewPort: 0,
  bottomViewPort: window.innerHeight + BUFFER_BOTTOM,
};

export const articleListReducer = (
  state = initState,
  action: AnyAction,
): State => {
  if (updateViewPortInfo.match(action)) {
    return { ...state, ...action.payload };
  }
  if (fetchArticleListActions.request.match(action)) {
    return update(state, {
      loading: { $set: true },
    });
  }
  if (fetchArticleListActions.success.match(action)) {
    return update(state, {
      loading: { $set: false },
      articleList: { $set: action.payload.articleList },
      pageHeight: { $set: action.payload.pageHeight },
      pageNumber: { $set: action.payload.pageNumber },
      total: { $set: action.payload.total },
      articleItemLayoutCache: { $set: action.payload.visibleImagesMap },
    });
  }
  if (fetchArticleListActions.failure.match(action)) {
    return update(state, {
      loading: { $set: false },
    });
  }
  return state;
};
