import React from "react";
import classnames from "classnames";

interface DigitProps {
  digit: string;
  className?: string;
}

export default class Digit extends React.PureComponent<DigitProps> {
  renderNum = () => {
    const { className } = this.props;
    const children = [];
    for (let i = 0; i < 10; i += 1) {
      children.push(
        <div key={i} className={`${className}-item`}>
          <span>{i}</span>
        </div>,
      );
    }
    return children;
  };

  render() {
    const { className, digit } = this.props;
    return (
      <b className={classnames(className, `d${digit}`)}>{this.renderNum()}</b>
    );
  }
}
