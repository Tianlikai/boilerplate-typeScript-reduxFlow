import React from "react";
import { DashboardOutlined } from "@ant-design/icons";
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
    document.title = "仪表盘";
    this.props.getChartData();
  }

  render() {
    return (
      <div className={PREFIX}>
        <div className={`${PREFIX}-header`}>
          <DashboardOutlined className={`${PREFIX}-headerIcon`} />
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
