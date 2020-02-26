import React from "react";

interface InjectedProps {
  count: number;
  onIncrement: () => void;
}

export const withCounterState = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>,
) => {
  type HocProps = Omit<BaseProps, keyof InjectedProps> & {
    initialCount?: number;
  };
  interface HOCState {
    count: number;
  }

  class HOC extends React.PureComponent<HocProps, HOCState> {
    static displayName = `withCounterState(${BaseComponent.name})`;

    constructor(props: HocProps) {
      super(props);
      this.state = {
        count: props.initialCount || 0,
      };
    }

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { count } = this.state;
      return (
        <BaseComponent
          count={count}
          onIncrement={this.handleIncrement}
          {...(this.props as BaseProps)}
        />
      );
    }
  }
  return HOC;
};
