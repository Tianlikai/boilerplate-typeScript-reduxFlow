import React from "react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { Article } from "../../interface";
import "./index.scss";

const PREFIX = "PhoneSingleArticle";

interface PhoneSingleArticleProps {
  articles: Article[];
}

export const PhoneSingleArticle: React.FC<PhoneSingleArticleProps> = ({
  articles,
}) => (
  <>
    {map(articles, article => (
      <div className={`${PREFIX}`}>
        <Link to="#" className={`${PREFIX}-img`}>
          <img src={article.imgUrl} />
        </Link>
        <div className={`${PREFIX}-content`}>
          <Link to="#" className={`${PREFIX}-link`}>
            <div className={`${PREFIX}-title`}>{article.title}</div>
          </Link>
          <div className={`${PREFIX}-status`}>
            <div className={`${PREFIX}-statusAuthor`}>{article.author}</div>
            <div className={`${PREFIX}-statusPublishTime`}>
              {`${article.publishTime}`.slice(0, 6)}
            </div>
            <div className={`${PREFIX}-statusLikes`}>{article.likes}人喜欢</div>
          </div>
        </div>
      </div>
    ))}
  </>
);
