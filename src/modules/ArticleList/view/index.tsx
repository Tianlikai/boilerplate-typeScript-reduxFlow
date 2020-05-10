import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { PhoneSingleArticle } from "../components/PhoneSingleArticle";
import { WebSingleArticle } from "../components/WebSingleArticle";
import { MyWebLoader, MyPhoneLoader } from "../components/CustomLoader";
import {
  rootSelector,
  articleListSelector,
  articleItemLayoutCacheSelector,
} from "../selector";
import {
  isPcSelector,
  innerHeightSelector,
} from "../../Common/Client/selector";
import { updateViewPortInfo, fetchArticleListActions } from "../action";
import "./index.scss";
import { getBufferViewPort } from "../utils";

const PREFIX = "ArticleList";
const TIME_INTERVAL = 100;
const BUFFER_TO_BOTTOM = 300;

const mapStateToProps = createSelector(
  rootSelector,
  articleListSelector,
  innerHeightSelector,
  isPcSelector,
  articleItemLayoutCacheSelector,
  (state, articleList, innerHeight, isPc, articleItemLayoutCache) => ({
    articleItemLayoutCache,
    articleList,
    innerHeight,
    isPc,
    loading: state.loading,
    lastScroll: state.lastScroll,
    pageHeight: state.pageHeight,
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
    document.title = "列表";
    const { pageNumber, pageSize, fetchArticleList } = this.props;
    fetchArticleList({ pageNumber, pageSize });
    this.timer = window.setTimeout(this.handleScroll, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleScroll = (force: boolean) => {
    clearTimeout(this.timer);
    const {
      articleList,
      innerHeight,
      lastScroll,
      pageHeight,
      total,
    } = this.props;
    const { scrollY } = window;
    // 如果时间间隔内，没有发生滚动，并且未强制触发，重启定时器并且返回
    if (force || lastScroll < scrollY) {
      const nextLastScroll = scrollY;
      const { bottomViewPort, topViewPort } = getBufferViewPort(
        innerHeight,
        pageHeight,
        scrollY,
      );
      this.props.updateViewPort({
        lastScroll: nextLastScroll,
        topViewPort,
        bottomViewPort,
      });
      if (
        scrollY + innerHeight + BUFFER_TO_BOTTOM > pageHeight &&
        total > articleList.length
      ) {
        const { loading, pageNumber, pageSize, fetchArticleList } = this.props;
        !loading && fetchArticleList({ pageNumber, pageSize });
      }
    }
    this.timer = window.setTimeout(this.handleScroll, TIME_INTERVAL);
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
        {isPc ? (
          <div ref={this.webRef} className={`${PREFIX} ${PREFIX}-web`}>
            {loading && articleList.length === 0 && <MyWebLoader />}
            <WebSingleArticle
              articles={articleList}
              articleItemLayoutCache={articleItemLayoutCache}
              bottomViewPort={bottomViewPort}
            />
          </div>
        ) : (
          <div ref={this.phoneRef} className={`${PREFIX} ${PREFIX}-phone`}>
            {loading && articleList.length === 0 && <MyPhoneLoader />}
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
