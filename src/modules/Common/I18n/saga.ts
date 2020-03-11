import { put, takeLatest, call, select } from "redux-saga/effects";
import { localeSelector } from "./selector";
import { updateI18nActions, initI18nAction } from "./action";
import Api from "./api";

function* initI18nWorker() {
  const locale: ReturnType<typeof localeSelector> = yield select(
    localeSelector,
  );
  yield put(updateI18nActions.request({ locale }));
}

function* updateLocalesWorker(
  action: ReturnType<typeof updateI18nActions.request>,
) {
  try {
    const { locale } = action.payload;
    const { errorCode, data }: SR<typeof Api.fetchLocalesApi> = yield call(
      Api.fetchLocalesApi,
      locale,
    );
    if (errorCode === 0) {
      yield put(updateI18nActions.success({ locale, messages: data }));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* i18nSaga() {
  yield takeLatest(initI18nAction.match, initI18nWorker);
  yield takeLatest(updateI18nActions.request.match, updateLocalesWorker);
}
