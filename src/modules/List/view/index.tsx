import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch, bindActionCreators } from "redux";
import { rootSelector } from "../selector";
import { searchActions } from "../action";
import ListTable from "../components/ListTable";
import "./index.scss";

const PREFIX = "List";

const mapStateToProps = createSelector(rootSelector, state => ({
  loading: state.loading,
  page: state.page,
  pageSize: state.pageSize,
}));

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ search: searchActions.request }, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class List extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.search();
  }

  render() {
    const { loading } = this.props;
    return (
      <div className={PREFIX}>
        <Button className={`${PREFIX}-create`} type="primary" size="large">
          新建
        </Button>
        <ListTable loading={loading} />
      </div>
    );
  }
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);

export default ConnectedList;
