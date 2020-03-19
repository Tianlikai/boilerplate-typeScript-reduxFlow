import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
// import ReactCharts from "echarts-for-react";
import { createSelector } from "reselect";
import RealTime from "../RealTime";
import { rootSelector } from "../../selector";
import MyChart from "../../../../components/Chart";
import "./index.scss";

const PREFIX = "DashboardContent";
const STYLE = {
  height: 500,
};

const mapStateToProps = createSelector(rootSelector, state => ({
  loading: state.loading,
  option: state.option,
}));

type Props = ReturnType<typeof mapStateToProps> & { className?: string };

const UnConnectContent: React.FC<Props> = ({ className, option }) => (
  <div className={classnames(PREFIX, className)}>
    <RealTime />
    <div className={`${PREFIX}-list`}>
      <MyChart
        className={`${PREFIX}-chart`}
        option={option}
        style={STYLE}
        showLoading={false}
      />
      <MyChart
        className={`${PREFIX}-chart`}
        option={option}
        style={STYLE}
        showLoading={false}
      />
    </div>
  </div>
);

export default connect(mapStateToProps)(UnConnectContent);
