import { put, takeLatest, call } from "redux-saga/effects";
import { searchArticleListActions } from "./action";
import Api from "./api";

function* searchArticleListWorker(
  action: ReturnType<typeof searchArticleListActions.request>,
) {
  try {
    const res: SR<typeof Api.postArticleList> = yield call(
      Api.postArticleList,
      action.payload,
    );
    if (res.errCode === 0) {
      const { data } = res;
      yield put(
        searchArticleListActions.success({ ...data, ...action.payload }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(searchArticleListActions.failure());
  }
}

export function* listSaga() {
  yield takeLatest(
    searchArticleListActions.request.match,
    searchArticleListWorker,
  );
}
