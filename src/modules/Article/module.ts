import { ArticleReducer } from "./reducer";
import { articleSaga } from "./saga";

export const articleModule = {
  namespace: "Article",
  reducer: ArticleReducer,
  saga: articleSaga,
};
