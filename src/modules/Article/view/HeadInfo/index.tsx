import React from "react";
import dayjs from "dayjs";
import { Article } from "../../interface";
import "./index.scss";

const PREFIX = "ArticleHeadInfo";
const FORMAT = "YYYY-MM-DD HH:mm:ss";

interface HeadInfoProps {
  article: Article;
}

const HeadInfo: React.FC<HeadInfoProps> = ({ article }) => (
  <div className={`${PREFIX}`}>
    <div className={`${PREFIX}-avatar`}></div>
    <div className={`${PREFIX}-auth`}>
      <div className={`${PREFIX}-authName`}>{article.author || ""}</div>
      <div className={`${PREFIX}-article`}>
        <span className={`${PREFIX}-articleTime`}>
          {article.publishTime
            ? dayjs(article.publishTime).format(FORMAT)
            : "-"}
        </span>
        <span className={`${PREFIX}-articleCount`}>阅读 {article.reviews}</span>
      </div>
    </div>
  </div>
);

export default React.memo(HeadInfo);
