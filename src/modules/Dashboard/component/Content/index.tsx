import React from "react";
import classnames from "classnames";
import RealTime from "../RealTime";

const PREFIX = "DashboardContent";

interface Props {
  className?: string;
}

export default class Content extends React.PureComponent<Props> {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames(PREFIX, className)}>
        <RealTime />
        <div className={`${PREFIX}-list`}></div>
      </div>
    );
  }
}
