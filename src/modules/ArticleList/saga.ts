import { map } from "lodash";
import { put, takeLatest, call, select } from "redux-saga/effects";
import { fetchArticleListActions } from "./action";
import {
  articleListSelector,
  articleItemLayoutCacheSelector,
} from "./selector";
import { isPcSelector } from "../Common/Client/selector";
import {
  WEB_LINE,
  WEB_LINE_HEIGHT,
  WEB_OFFSET,
  PHONE_LINE,
  PHONE_LINE_HEIGHT,
  PHONE_OFFSET,
} from "./constant";
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
      const { articleList: newArticleList, total } = res.data;

      /**
       * isPc 判断是否是pc端
       * pc端和移动端排列方式不一样
       */
      const isPc: SR<typeof isPcSelector> = yield select(isPcSelector);
      /**
       * pc端和移动端每行卡片个数固定
       */
      const LINE = isPc ? WEB_LINE : PHONE_LINE;
      /**
       * 这里行高固定
       */
      const LINE_HEIGHT = isPc ? WEB_LINE_HEIGHT : PHONE_LINE_HEIGHT;
      const OFFSET = isPc ? WEB_OFFSET : PHONE_OFFSET;

      const articleList: SR<typeof articleListSelector> = yield select(
        articleListSelector,
      );
      const visibleImagesMap: SR<typeof articleItemLayoutCacheSelector> = yield select(
        articleItemLayoutCacheSelector,
      );

      const index =
        articleList.length > 0 ? articleList[articleList.length - 1].id + 1 : 0;

      const nextArticleList = map(newArticleList, article => {
        const id = index + article.id;
        const line = Math.floor(id / LINE);
        const top = LINE_HEIGHT * line + OFFSET;
        /**
         * 缓存位置信息
         * 这里由于每项高度固定，所以方便计算
         */
        visibleImagesMap[id] = {
          top,
          bottom: top + LINE_HEIGHT,
          height: LINE_HEIGHT,
        };
        return {
          ...article,
          id,
        };
      });

      yield put(
        fetchArticleListActions.success({
          pageSize,
          total,
          visibleImagesMap,
          articleList: [...articleList, ...nextArticleList],
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
