import { AsyncGroupCreator } from "../../packages/flux-payload-action";
import { ArticleResponse } from "./interface";
import { NetworkErrorMessage } from "../../interface";

const NAMESPACE = "Article";

export const getArticleActions = AsyncGroupCreator<
  { id: string },
  ArticleResponse["data"],
  NetworkErrorMessage | void
>(`${NAMESPACE}/getArticle`);
