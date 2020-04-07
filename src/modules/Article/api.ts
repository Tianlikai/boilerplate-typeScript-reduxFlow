import Service from "../../api";
import { ArticleResponse } from "./interface";

const getArticleByID = (id: string) => {
  return Service.get<ArticleResponse>(`/api/article/${id}`);
};

export default {
  getArticleByID,
};
