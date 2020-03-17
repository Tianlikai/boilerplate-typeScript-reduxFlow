import { map } from "lodash";
import { put, takeLatest, call, select } from "redux-saga/effects";
import { fetchArticleListActions } from "./action";
import { articleListSelector } from "./selector";
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
      const { pageNumber, pageSize } = action.payload;
      const articleList: SR<typeof articleListSelector> = yield select(
        articleListSelector,
      );
      const { articleList: newArticleList, total } = res.data;
      const nextArticleList = [
        ...articleList,
        ...map(newArticleList, article => {
          return {
            ...article,
            id: parseInt(`${pageNumber - 1}${article.id}`),
          };
        }),
      ];
      yield put(
        fetchArticleListActions.success({
          pageSize,
          total,
          articleList: nextArticleList,
          pageNumber: pageNumber + 1,
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
