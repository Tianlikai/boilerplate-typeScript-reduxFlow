import React from "react";
import { MouseProviderProps, MouseProviderState } from "./interface";

export default class MouseProvider extends React.PureComponent<
  MouseProviderProps,
  MouseProviderState
> {
  state: MouseProviderState = {
    x: 0,
    y: 0,
  };

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) =>
    this.setState({ x: e.clientX, y: e.clientY });

  render() {
    const style = { height: "100%" };
    const { render } = this.props;
    return (
      <div style={style} onMouseMove={this.handleMouseMove}>
        {render(this.state)}
      </div>
    );
  }
}
