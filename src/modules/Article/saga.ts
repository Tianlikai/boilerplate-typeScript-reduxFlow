import { put, takeLatest, call } from "redux-saga/effects";
import { getArticleActions } from "./action";
import Api from "./api";
import { NetworkErrorType } from "../../interface";

function* getArticleActionsWorker(
  action: ReturnType<typeof getArticleActions.request>,
) {
  try {
    const res: SR<typeof Api.getArticleByID> = yield call(
      Api.getArticleByID,
      action.payload.id,
    );
    if (res.errCode === 0) {
      yield put(getArticleActions.success(res.data));
    } else {
      yield put(
        getArticleActions.failure({
          type: NetworkErrorType.NOT_FOUND,
          message: "你要找的资源不存在~~~",
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(getArticleActions.failure());
  }
}

export function* articleSaga() {
  yield takeLatest(getArticleActions.request.match, getArticleActionsWorker);
}
