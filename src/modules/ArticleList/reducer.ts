import { AnyAction } from "redux";
import update from "immutability-helper";
import { updateViewPortInfo, fetchArticleListActions } from "./action";
import { Article, ArticleItemLayout } from "./interface";
import { getBufferViewPort } from "./utils";

interface State {
  articleList: Article[];
  loading: boolean;
  innerHeight: number;
  lastScroll: number;
  pageNumber: number;
  pageSize: number;
  total: number;
  topViewPort: number;
  bottomViewPort: number;
  articleItemLayoutCache: {
    [articleId: number]: ArticleItemLayout;
  };
}

const initState: State = {
  articleList: [],
  loading: false,
  innerHeight: 0,
  lastScroll: 0,
  pageNumber: 1,
  pageSize: 20,
  total: 0,
  topViewPort: getBufferViewPort().topViewPort,
  bottomViewPort: getBufferViewPort().bottomViewPort,
  articleItemLayoutCache: {},
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
