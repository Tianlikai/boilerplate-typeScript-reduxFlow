import React from "react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { MessageOutlined, LikeOutlined } from "@ant-design/icons";
import LazyImage from "../../../../components/LazyImage";
import { Article, ArticleItemLayout } from "../../interface";
import { IMAGES_SOURCE_ADDRESS } from "../../constant";
import { isVisible } from "../../utils";
import "./index.scss";

const PREFIX = "WebSingleArticle";

interface WebSingleArticleProps {
  articles: Article[];
  articleItemLayoutCache: { [articleId: number]: ArticleItemLayout };
  bottomViewPort: number;
}

export const WebSingleArticle: React.FC<WebSingleArticleProps> = ({
  articles,
  articleItemLayoutCache,
  bottomViewPort,
}) => (
  <>
    {map(articles, article => (
      <div key={article.id} className={`${PREFIX}Wrapper`}>
        <div className={PREFIX}>
          <Link to={`article/${article.id}`}>
            <div className={`${PREFIX}-img`}>
              <LazyImage
                src={`${IMAGES_SOURCE_ADDRESS}${article.id}.jpg`}
                isVisible={isVisible(
                  articleItemLayoutCache[article.id].top,
                  bottomViewPort,
                )}
              />
            </div>
            <div className={`${PREFIX}-content`}>
              <div className={`${PREFIX}-title`}>{article.title}</div>
              <div className={`${PREFIX}-status`}>
                <div className={`${PREFIX}-statusPublishTime`}>
                  {article.publishTime}
                </div>
                <div className={`${PREFIX}-statusInfo`}>
                  <div className={`${PREFIX}-statusComments`}>
                    {article.reviews}
                    <MessageOutlined />
                  </div>
                  <div className={`${PREFIX}-statusLikes`}>
                    {article.likes}
                    <LikeOutlined />
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className={`${PREFIX}-author`}>
            <Link
              to={`article/${article.id}`}
              className={`${PREFIX}-authorLink`}
            >
              {article.author}
            </Link>
          </div>
        </div>
      </div>
    ))}
  </>
);
