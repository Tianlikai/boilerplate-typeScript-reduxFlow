import { createStore, applyMiddleware, Reducer, Middleware } from "redux";

export const createProdStore = (
  reducer: Reducer,
  state: object = {},
  middleware: Middleware[],
) => createStore(reducer, state, applyMiddleware(...middleware));
