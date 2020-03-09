import update from "immutability-helper";
import { AnyAction } from "redux";
import { searchArticleListActions } from "./action";
import { Article } from "./interface";

interface State {
  articleList: Article[];
  loading: boolean;
  pageNumber: number;
  pageSize: number;
  total: number;
}

const initState: State = {
  articleList: [],
  loading: false,
  pageNumber: 1,
  pageSize: 10,
  total: 0,
};

export const listReducer = (state = initState, action: AnyAction): State => {
  if (searchArticleListActions.request.match(action)) {
    return update(state, {
      loading: { $set: true },
    });
  }
  if (searchArticleListActions.success.match(action)) {
    return update(state, {
      loading: { $set: false },
      total: { $set: action.payload.total },
      articleList: { $set: action.payload.articleList },
    });
  }
  if (searchArticleListActions.failure.match(action)) {
    return update(state, {
      loading: { $set: false },
    });
  }
  return state;
};
