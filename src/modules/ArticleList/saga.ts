import { put, takeLatest, call } from "redux-saga/effects";
import { fetchArticleListActions } from "./action";
import Api from "./api";

function* fetchArticleListWorker(
  action: ReturnType<typeof fetchArticleListActions.request>,
) {
  try {
    const res: SR<typeof Api.postArticleList> = yield call(
      Api.postArticleList,
      action.payload,
    );
    if (res.errorCode === 0) {
      const { data } = res;
      yield put(
        fetchArticleListActions.success({
          ...data,
          ...action.payload,
          pageNumber: action.payload.pageNumber + 1,
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(fetchArticleListActions.failure());
  }
}

export function* articleListSaga() {
  yield takeLatest(
    fetchArticleListActions.request.match,
    fetchArticleListWorker,
  );
}
