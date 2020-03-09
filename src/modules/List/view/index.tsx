import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch, bindActionCreators } from "redux";
import { rootSelector } from "../selector";
import { searchArticleListActions } from "../action";
import ListTable from "../components/ListTable";
import "./index.scss";
// import DrawerForm from "./DrawerForm";

const PREFIX = "List";

const mapStateToProps = createSelector(rootSelector, state => ({
  articleList: state.articleList,
  loading: state.loading,
  pageNumber: state.pageNumber,
  pageSize: state.pageSize,
  total: state.total,
}));

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { searchArticleList: searchArticleListActions.request },
    dispatch,
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class List extends React.PureComponent<Props> {
  componentDidMount() {
    const { pageNumber, pageSize } = this.props;
    this.props.searchArticleList({ pageNumber, pageSize });
  }

  render() {
    const { articleList, loading, pageNumber, pageSize, total } = this.props;
    return (
      <div className={PREFIX}>
        <Button className={`${PREFIX}-create`} type="primary">
          新建
        </Button>
        <ListTable
          dataSource={articleList}
          loading={loading}
          pageNumber={pageNumber}
          pageSize={pageSize}
          total={total}
        />
        {/* <DrawerForm /> */}
      </div>
    );
  }
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);

export default ConnectedList;
