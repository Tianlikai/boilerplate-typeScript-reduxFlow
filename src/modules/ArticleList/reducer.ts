import { AnyAction } from "redux";
import update from "immutability-helper";
import { updateViewPortInfo, fetchArticleListActions } from "./action";
import { Article } from "./interface";

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
}

const initState: State = {
  articleList: [],
  loading: false,
  innerHeight: 0,
  lastScroll: 0,
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  topViewPort: 0,
  bottomViewPort: 0,
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
    const nextArticleList = [
      ...state.articleList,
      ...action.payload.articleList,
    ];
    return update(state, {
      loading: { $set: false },
      articleList: { $set: nextArticleList },
      pageNumber: { $set: action.payload.pageNumber },
      total: { $set: action.payload.total },
    });
  }
  if (fetchArticleListActions.failure.match(action)) {
    return update(state, {
      loading: { $set: false },
    });
  }
  return state;
};
