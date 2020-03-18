import React from "react";
import { Helmet } from "react-helmet";
import { Dispatch, bindActionCreators } from "redux";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { PhoneSingleArticle } from "../components/PhoneSingleArticle";
import { WebSingleArticle } from "../components/WebSingleArticle";
import {
  rootSelector,
  articleListSelector,
  articleItemLayoutCacheSelector,
} from "../selector";
import { isPcSelector } from "../../Common/Client/selector";
import { updateViewPortInfo, fetchArticleListActions } from "../action";
import "./index.scss";
import { getBufferViewPort } from "../utils";

const PREFIX = "ArticleList";

const mapStateToProps = createSelector(
  rootSelector,
  articleListSelector,
  isPcSelector,
  articleItemLayoutCacheSelector,
  (state, articleList, isPc, articleItemLayoutCache) => ({
    articleItemLayoutCache,
    articleList,
    isPc,
    loading: state.loading,
    innerHeight: state.innerHeight,
    lastScroll: state.lastScroll,
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    total: state.total,
    topViewPort: state.topViewPort,
    bottomViewPort: state.bottomViewPort,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchArticleList: fetchArticleListActions.request,
      updateViewPort: updateViewPortInfo,
    },
    dispatch,
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class UnconnectedArticleList extends React.PureComponent<Props> {
  private timer: number;
  private webRef = React.createRef<HTMLDivElement>();
  private phoneRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const { pageNumber, pageSize, fetchArticleList } = this.props;
    fetchArticleList({ pageNumber, pageSize });
    this.timer = window.setTimeout(this.handleScroll, 100);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleScroll = (force: boolean) => {
    clearTimeout(this.timer);
    const { articleList, lastScroll, total } = this.props;
    const { innerHeight, scrollY } = window;
    // 如果时间间隔内，没有发生滚动，并且未强制触发，重启定时器并且返回
    if (force || lastScroll < scrollY) {
      const nextLastScroll = scrollY;
      const { bottomViewPort, topViewPort } = getBufferViewPort();
      this.props.updateViewPort({
        lastScroll: nextLastScroll,
        topViewPort,
        bottomViewPort,
      });
      if (
        scrollY + innerHeight + 200 > document.body.scrollHeight &&
        total > articleList.length
      ) {
        const { loading, pageNumber, pageSize, fetchArticleList } = this.props;
        !loading && fetchArticleList({ pageNumber, pageSize });
      }
    }
    this.timer = window.setTimeout(this.handleScroll, 100);
  };

  render() {
    const {
      articleItemLayoutCache,
      articleList,
      bottomViewPort,
      isPc,
      loading,
      total,
    } = this.props;
    return (
      <>
        <Helmet>
          <title>列表</title>
        </Helmet>
        {isPc ? (
          <div ref={this.webRef} className={`${PREFIX} ${PREFIX}-web`}>
            <WebSingleArticle
              articles={articleList}
              articleItemLayoutCache={articleItemLayoutCache}
              bottomViewPort={bottomViewPort}
            />
          </div>
        ) : (
          <div ref={this.phoneRef} className={`${PREFIX} ${PREFIX}-phone`}>
            <PhoneSingleArticle
              articles={articleList}
              articleItemLayoutCache={articleItemLayoutCache}
              bottomViewPort={bottomViewPort}
            />
          </div>
        )}
        {articleList.length !== 0 && loading && articleList.length < total && (
          <div className={`${PREFIX}-loading`}>正在努力加载中</div>
        )}
        {articleList.length !== 0 && articleList.length >= total && (
          <div className={`${PREFIX}-end`}>没有更多内容了</div>
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedArticleList);
