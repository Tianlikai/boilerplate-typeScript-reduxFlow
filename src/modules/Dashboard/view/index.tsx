import React from "react";
import { Helmet } from "react-helmet";
import { Icon } from "antd";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import SideMenu from "../component/SideMenu";
import Content from "../component/Content";
import { getChartData } from "../action";

import "./index.scss";

const PREFIX = "Dashboard";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getChartData: getChartData.request }, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>;

class UnConnectDashboard extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.getChartData();
  }

  render() {
    return (
      <div className={PREFIX}>
        <Helmet>
          <title>仪表盘</title>
        </Helmet>
        <div className={`${PREFIX}-header`}>
          <Icon className={`${PREFIX}-headerIcon`} type="dashboard" />
          <span className={`${PREFIX}-headerText`}>仪表盘</span>
        </div>
        <div className={`${PREFIX}-wrap`}>
          <SideMenu className={`${PREFIX}-wrapSideMenu`} />
          <Content className={`${PREFIX}-wrapContent`} />
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(UnConnectDashboard);
