import React from "react";
import dayJs from "dayjs";
import classnames from "classnames";
import "./index.scss";

const PREFIX = "RealTime";
const FORMAT = "MMMM D YYYY, h:mm:ss A";

interface Props {
  className?: string;
}

interface State {
  time: string;
}

export default class RealTime extends React.PureComponent<Props, State> {
  interval: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.interval = setInterval(() => this.tick(), 1000);
    this.state = {
      time: dayJs().format(FORMAT),
    };
  }

  componentWillUnmount() {
    clearInterval(Number(this.interval));
  }

  tick = () => this.setState({ time: dayJs().format(FORMAT) });

  render() {
    const { className } = this.props;
    const { time } = this.state;
    return <div className={classnames(PREFIX, className)}>{time}</div>;
  }
}
