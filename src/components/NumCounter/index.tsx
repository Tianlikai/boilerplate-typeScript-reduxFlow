import React from "react";
import classnames from "classnames";
import Digit from "./Digit";
import "./index.scss";

const PREFIX = "NumCounter";

interface NumCounterProps {
  className?: string;
  number: number;
}

export default class NumCounter extends React.PureComponent<NumCounterProps> {
  static defaultProps = {
    number: 0,
  };

  renderNum = (num: number) => {
    const isNegative = num < 0;
    const arr = [];
    const numStr = Math.abs(num).toString();
    const len = numStr.length;
    for (let i = 0; i < len; i += 1) {
      arr.unshift(
        <Digit
          key={i}
          className={`${PREFIX}-digit`}
          digit={numStr[len - 1 - i]}
        />,
      );
      if (i != len - 1 && i % 3 == 2) {
        arr.unshift(
          <span key={`separator${i}`} className={`${PREFIX}-separator`}>
            ,
          </span>,
        );
      }
    }
    if (isNegative) arr.unshift("-");
    return arr;
  };

  render() {
    const { className, number } = this.props;
    return (
      <div className={classnames(PREFIX, className)}>
        {this.renderNum(number)}
      </div>
    );
  }
}
