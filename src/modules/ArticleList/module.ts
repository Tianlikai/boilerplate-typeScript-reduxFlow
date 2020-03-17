import { articleListReducer } from "./reducer";
import { articleListSaga } from "./saga";

export const articleListModule = {
  namespace: "ArticleList",
  reducer: articleListReducer,
  saga: articleListSaga,
};
