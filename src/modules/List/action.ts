import { AsyncGroupCreator } from "../../packages/flux-payload-action";
import { PostArticleListRequest, ArticleListResponse } from "./interface";

const NAMESPACE = "LIST";

export const searchArticleListActions = AsyncGroupCreator<
  PostArticleListRequest,
  ArticleListResponse["data"] & { pageNumber: number; pageSize: number },
  void
>(`${NAMESPACE}/initList`);
