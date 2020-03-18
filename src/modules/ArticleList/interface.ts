import React from "react";
import { Response } from "../../api/interface";

export interface Attachment {
  name: string;
  url: string;
}

export interface Article {
  id: number;
  title: React.ReactNode;
  author: string;
  publishTime: number;
  reviews: number;
  likes: number;
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
