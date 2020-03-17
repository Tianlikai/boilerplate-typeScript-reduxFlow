import React from "react";
import { PhoneSingleArticle } from "../components/PhoneSingleArticle";
import { WebSingleArticle } from "../components/WebSingleArticle";
import "./index.scss";
import { rootSelector } from "../selector";
import { Dispatch, bindActionCreators } from "redux";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { updateViewPortInfo, fetchArticleListActions } from "../action";

const PREFIX = "ArticleList";

const mapStateToProps = createSelector(rootSelector, state => ({
  articleList: state.articleList,
  loading: state.loading,
  innerHeight: state.innerHeight,
  lastScroll: state.lastScroll,
  pageNumber: state.pageNumber,
  pageSize: state.pageSize,
  topViewPort: state.topViewPort,
  bottomViewPort: state.bottomViewPort,
}));

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
    const { lastScroll } = this.props;
    const { innerHeight, scrollY } = window;
    // 如果时间间隔内，没有发生滚动，并且未强制触发，重启定时器并且返回
    if (force || lastScroll < scrollY) {
      const nextLastScroll = scrollY;
      const topViewPort = scrollY - 1000;
      const bottomViewPort = scrollY + innerHeight + 600;
      this.props.updateViewPort({
        lastScroll: nextLastScroll,
        topViewPort,
        bottomViewPort,
      });
      if (scrollY + innerHeight + 200 > document.body.scrollHeight) {
        const { loading, pageNumber, pageSize, fetchArticleList } = this.props;
        !loading && fetchArticleList({ pageNumber, pageSize });
      }
    }
    this.timer = window.setTimeout(this.handleScroll, 100);
  };

  render() {
    const { articleList } = this.props;
    return (
      <>
        <div className={`${PREFIX} ${PREFIX}-web`}>
          <WebSingleArticle articles={articleList} />
        </div>
        <div className={`${PREFIX} ${PREFIX}-phone`}>
          <PhoneSingleArticle articles={articleList} />
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedArticleList);
