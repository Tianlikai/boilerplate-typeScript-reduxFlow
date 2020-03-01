import React from "react";
import { Icon } from "antd";
import SideMenu from "../component/SideMenu";
import Content from "../component/Content";

import "./index.scss";

const PREFIX = "Dashboard";

export default class Dashboard extends React.PureComponent<{}> {
  render() {
    return (
      <div className={PREFIX}>
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
