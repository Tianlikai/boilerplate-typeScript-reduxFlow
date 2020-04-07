import { Response } from "../../api/interface";

export interface RouterInfo {
  id: string;
}

export interface Article {
  id: number;
  title: React.ReactNode;
  author: string;
  publishTime: number;
  reviews: number;
  likes: number;
}

export interface ArticleMap {
  [id: string]: Article;
}

export interface ArticleResponse extends Response {
  data: Article;
}
