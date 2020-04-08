import update from "immutability-helper";
import { AnyAction } from "redux";
import { ArticleMap } from "./interface";
import { getArticleActions, resetErrorInfoAction } from "./action";
import { NetworkErrorMessage } from "../../interface";

interface State {
  articleMap: ArticleMap;
  errorInfo: NetworkErrorMessage | void;
  loading: boolean;
}

const initState: State = {
  articleMap: {},
  errorInfo: undefined,
  loading: false,
};

export const ArticleReducer = (state = initState, action: AnyAction): State => {
  if (getArticleActions.request.match(action)) {
    return update(state, {
      loading: { $set: true },
    });
  }
  if (getArticleActions.success.match(action)) {
    return update(state, {
      loading: { $set: false },
      errorInfo: { $set: undefined },
      articleMap: {
        [action.payload.id]: { $set: action.payload },
      },
    });
  }
  if (getArticleActions.failure.match(action)) {
    return update(state, {
      loading: { $set: false },
      errorInfo: { $set: action.payload },
    });
  }
  if (resetErrorInfoAction.match(action)) {
    return update(state, {
      errorInfo: { $set: undefined },
    });
  }
  return state;
};
