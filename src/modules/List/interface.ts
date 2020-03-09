import { Response } from "../../api/interface";
import { ArticleStatus } from "./constant";

export interface Attachment {
  name: string;
  url: string;
}

export interface Article {
  attachments: Attachment[];
  coverUrl: string;
  createTime: number;
  name: string;
  publishTime: number;
  status: ArticleStatus;
}

export interface PostArticleListRequest {
  pageNumber: number;
  pageSize: number;
}

export interface ArticleListResponse extends Response {
  data: {
    total: number;
    articleList: Article[];
  };
}
