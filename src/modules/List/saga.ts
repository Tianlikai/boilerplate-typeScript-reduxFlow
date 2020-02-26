import { put, takeLatest, delay } from "redux-saga/effects";
import { searchActions } from "./action";

function* searchWorker() {
  try {
    yield delay(1000);
    yield put(searchActions.success());
  } catch (error) {
    console.log(error);
    yield put(searchActions.failure());
  }
}

export function* listSaga() {
  yield takeLatest(searchActions.request.match, searchWorker);
}
