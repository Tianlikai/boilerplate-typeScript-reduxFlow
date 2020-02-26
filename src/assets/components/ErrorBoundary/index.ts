import React from "react";
import { Omit } from "react-redux";

interface ErrorBoundaryProps {
  renderFallback?: () => React.ReactNode;
  children: React.ReactNode;
}

interface State {
  isError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = {
    isError: false,
  };
  componentDidCatch() {
    this.setState({ isError: true });
  }
  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.props.children !== prevProps.children) {
      this.setState({ isError: false });
    }
  }
  render() {
    const { renderFallback = () => null } = this.props;
    return this.state.isError ? renderFallback() : this.props.children;
  }
}

export const withErrorBoundary = (
  props: Omit<ErrorBoundaryProps, "children">,
) => <T>(
  component: React.ComponentType<T>,
): React.ComponentType<T> => innerProps =>
  React.createElement(ErrorBoundary, {
    ...props,
    children: React.createElement(component, innerProps),
  });
