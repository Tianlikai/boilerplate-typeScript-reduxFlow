import { put, takeLatest, call } from "redux-saga/effects";
import { getChartData } from "./action";
import Api from "./api";

function* searchWorker() {
  try {
    const res: SR<typeof Api.getChartData> = yield call(Api.getChartData);
    if (res.errorCode === 0) {
      const { data } = res;
      yield put(getChartData.success({ option: data.option }));
    }
  } catch (error) {
    console.log(error);
    yield put(getChartData.failure());
  }
}

export function* dashboardSaga() {
  yield takeLatest(getChartData.request.match, searchWorker);
}
