import { createStore, applyMiddleware, Reducer, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const createDevStore = (
  reducer: Reducer,
  state: object = {},
  middleware: Middleware[],
) =>
  createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
