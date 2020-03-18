import React from "react";
import { Helmet } from "react-helmet";
import { Dispatch, bindActionCreators } from "redux";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { PhoneSingleArticle } from "../components/PhoneSingleArticle";
import { WebSingleArticle } from "../components/WebSingleArticle";
import { rootSelector, articleListSelector } from "../selector";
import { updateViewPortInfo, fetchArticleListActions } from "../action";
import "./index.scss";

const PREFIX = "ArticleList";

const mapStateToProps = createSelector(
  rootSelector,
  articleListSelector,
  (state, articleList) => ({
    articleList: articleList,
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

enum MODE {
  WEB = "web",
  PHONE = "phone",
}

interface State {
  mode: MODE;
}

class UnconnectedArticleList extends React.PureComponent<Props, State> {
  private timer: number;
  private webRef = React.createRef<HTMLDivElement>();
  private phoneRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: this.getMode(),
    };
  }

  componentDidMount() {
    const { pageNumber, pageSize, fetchArticleList } = this.props;
    fetchArticleList({ pageNumber, pageSize });
    this.timer = window.setTimeout(this.handleScroll, 100);
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener("resize", this.handleResize);
  }

  getMode = () => (document.body.clientWidth > 769 ? MODE.WEB : MODE.PHONE);

  handleResize = () => {
    this.setState({
      mode: this.getMode(),
    });
  };

  handleScroll = (force: boolean) => {
    clearTimeout(this.timer);
    const { articleList, lastScroll, total } = this.props;
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
    const { articleList, loading, total } = this.props;
    const { mode } = this.state;
    return (
      <>
        <Helmet>
          <title>列表</title>
        </Helmet>
        {mode === MODE.WEB ? (
          <div ref={this.webRef} className={`${PREFIX} ${PREFIX}-web`}>
            <WebSingleArticle articles={articleList} />
          </div>
        ) : (
          <div ref={this.phoneRef} className={`${PREFIX} ${PREFIX}-phone`}>
            <PhoneSingleArticle articles={articleList} />
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
