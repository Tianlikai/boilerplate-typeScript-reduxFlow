import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch, bindActionCreators } from "redux";
import { rootSelector } from "../selector";
import { searchActions } from "../action";

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
    return <div className={PREFIX}>{loading ? "loading..." : "list"}</div>;
  }
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);

export default ConnectedList;
