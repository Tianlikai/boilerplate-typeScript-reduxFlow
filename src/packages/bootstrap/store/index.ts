import { History } from "history";
import { Reducer, Middleware } from "redux";
import { Effect, all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createDevStore } from "./createDevStore";
import { createProdStore } from "./createProdStore";

export const configureStore = (
  history: History,
  rootReducer: Reducer,
  sagas: Effect[],
  initState: object = {},
  middleWare: Middleware[] = [],
) => {
  const isDev = process.env.NODE_ENV === "development";
  const sagaMiddleware = createSagaMiddleware();
  const store = (isDev ? createDevStore : createProdStore)(
    rootReducer,
    initState,
    [routerMiddleware(history), sagaMiddleware, ...middleWare],
  );
  let sagaTask = sagaMiddleware.run(function*() {
    try {
      yield all(sagas);
    } catch (error) {
      console.log(error);
    }
  });
  return Object.assign(store, {
    replaceReducer: (reducer: Reducer) => {
      store.replaceReducer(reducer);
    },
    replaceSaga: (saga: Effect[]) => {
      if (sagaTask) {
        sagaTask.toPromise().then(() => {
          sagaTask = sagaMiddleware.run(function*() {
            try {
              yield all(saga);
            } catch (e) {
              console.error(e);
            }
          });
        });
        sagaTask.cancel();
      }
    },
  });
};
