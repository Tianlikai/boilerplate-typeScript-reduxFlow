import { listReducer } from "./reducer";
import { listSaga } from "./saga";

export const listModule = {
  namespace: "List",
  reducer: listReducer,
  saga: listSaga,
};
