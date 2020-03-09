import { AxiosRequestConfig } from "axios";
import Service from "../../api";
import { ArticleListResponse, PostArticleListRequest } from "./interface";

const postArticleList = (data: PostArticleListRequest) => {
  const config: AxiosRequestConfig = { data };
  return Service.post<ArticleListResponse>("/api/list/articleList", config);
};

export default {
  postArticleList,
};
