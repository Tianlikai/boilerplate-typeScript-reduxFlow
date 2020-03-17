import React from "react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { Article } from "../../interface";
import { IMAGES_SOURCE_ADDRESS } from "../../constant";
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
      <div key={article.id} className={`${PREFIX}`}>
        <Link to="#" className={`${PREFIX}-img`}>
          <img src={`${IMAGES_SOURCE_ADDRESS}${article.id}.jpg`} />
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
