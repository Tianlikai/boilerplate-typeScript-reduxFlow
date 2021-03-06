import React from "react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import LazyImage from "../../../../components/LazyImage";
import { Article, ArticleItemLayout } from "../../interface";
import { IMAGES_SOURCE_ADDRESS } from "../../constant";
import { isVisible } from "../../utils";
import "./index.scss";

const PREFIX = "PhoneSingleArticle";

interface PhoneSingleArticleProps {
  articles: Article[];
  articleItemLayoutCache: { [articleId: number]: ArticleItemLayout };
  bottomViewPort: number;
}

export const PhoneSingleArticle: React.FC<PhoneSingleArticleProps> = ({
  articles,
  articleItemLayoutCache,
  bottomViewPort,
}) => (
  <>
    {map(articles, article => (
      <div key={article.id} className={`${PREFIX}`}>
        <Link to={`article/${article.id}`} className={`${PREFIX}-img`}>
          <LazyImage
            src={`${IMAGES_SOURCE_ADDRESS}${article.id}.jpg`}
            isVisible={isVisible(
              articleItemLayoutCache[article.id].top,
              bottomViewPort,
            )}
          />
        </Link>
        <div className={`${PREFIX}-content`}>
          <Link to={`article/${article.id}`} className={`${PREFIX}-link`}>
            <div className={`${PREFIX}-title`}>{article.title}</div>
          </Link>
          <div className={`${PREFIX}-status`}>
            <div className={`${PREFIX}-statusAuthor`} title={article.author}>
              {article.author}
            </div>
            <div className={`${PREFIX}-statusLikes`}>{article.likes}人喜欢</div>
          </div>
        </div>
      </div>
    ))}
  </>
);
