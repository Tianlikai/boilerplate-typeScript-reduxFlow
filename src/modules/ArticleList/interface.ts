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

/**
 * 缓存每一个卡片的位置信息
 */
export interface ArticleItemLayout {
  /**
   * 底部offsetTop
   */
  bottom: number;
  /**
   * 卡片高度
   */
  height: number;
  /**
   * 顶部offsetTop
   */
  top: number;
}
