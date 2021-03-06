import React from "react";
import memoizeOne from "memoize-one";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router";
import { IMAGES_SOURCE_ADDRESS } from "../../../modules/ArticleList/constant";
import LazyImage from "../../../components/LazyImage";
import HeadInfo from "./HeadInfo";
import { ARTICLE_MAP } from "../files";
import { createSelector } from "reselect";
import { rootSelector } from "../selector";
import { getArticleActions, resetErrorInfoAction } from "../action";
import { RouterInfo, ArticleMap } from "../interface";
import "./index.scss";
import "./markdown.scss";

const PREFIX = "Article";

const mapStateToProps = createSelector(rootSelector, state => ({
  articleMap: state.articleMap,
  errorInfo: state.errorInfo,
  loading: state.loading,
}));

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getArticle: getArticleActions.request,
      resetErrorInfo: resetErrorInfoAction,
    },
    dispatch,
  );

type ArticleProps = RouteComponentProps<RouterInfo> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface ArticleState {
  id: string;
}

class UnconnectedArticle extends React.PureComponent<
  ArticleProps,
  ArticleState
> {
  constructor(props: ArticleProps) {
    super(props);
    this.state = { id: props.match.params.id };
  }

  componentDidMount() {
    this.props.getArticle({ id: this.state.id });
  }

  componentDidUpdate(preProps: ArticleProps, preState: ArticleState) {
    const oldTitle = this.getArticle(preState.id, preProps.articleMap).title;
    const newTitle = this.getArticle(this.state.id, this.props.articleMap)
      .title;
    if (oldTitle !== newTitle) {
      document.title = `${newTitle}`;
    }
  }

  componentWillUnmount() {
    this.props.resetErrorInfo();
  }

  getArticle = memoizeOne((id: string, map: ArticleMap) => map[id] || {});

  render() {
    const { articleMap, errorInfo } = this.props;
    const { id } = this.state;
    const article = this.getArticle(id, articleMap);
    return (
      <div className={PREFIX}>
        {errorInfo ? (
          errorInfo.message
        ) : (
          <>
            <HeadInfo article={article} />
            <div className={`${PREFIX}-img`}>
              <LazyImage
                src={`${IMAGES_SOURCE_ADDRESS}${article.id}.jpg`}
                isVisible={article.id >= 0}
              />
            </div>
            <div className={`${PREFIX}-title`}>{article.title || "-"}</div>
            <article
              className={`${PREFIX}-wrap markdown-body`}
              dangerouslySetInnerHTML={{ __html: ARTICLE_MAP[article.id] }}
            ></article>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedArticle);
