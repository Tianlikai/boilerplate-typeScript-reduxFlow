import {
  ActionCreator,
  AsyncGroupCreator,
} from "../../packages/flux-payload-action";
import { PostArticleListRequest, ArticleListResponse } from "./interface";

const NAMESPACE = "ArticleList";

export const updateViewPortInfo = ActionCreator<{
  lastScroll?: number;
  topViewPort?: number;
  bottomViewPort?: number;
}>(`${NAMESPACE}/updateViewPortInfo`);

export const fetchArticleListActions = AsyncGroupCreator<
  PostArticleListRequest,
  ArticleListResponse["data"] & { pageNumber: number; pageSize: number },
  void
>(`${NAMESPACE}/fetchArticleList`);
