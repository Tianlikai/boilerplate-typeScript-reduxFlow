import React, { ComponentClass, PureComponent } from "react";
import { RouteComponentProps, RouteProps } from "react-router";
import { omitProps } from "../../utils/omitProps";
import { RouteWithAuth } from "../RouteWIthAuth";
import "./index.scss";

interface RouteWithLayoutProps<T> extends RouteProps {
  layout: ComponentClass<T>;
  layoutProps: T;
}

export class RouteWithLayout<T> extends PureComponent<RouteWithLayoutProps<T>> {
  public static defaultProps = {
    layoutProps: {},
  };
  routeRender = (props: RouteComponentProps) => {
    const {
      layout: Layout,
      render,
      component: InnerComponent,
      layoutProps,
    } = this.props;
    if (InnerComponent) {
      return (
        <Layout {...layoutProps}>
          <InnerComponent {...props} />
        </Layout>
      );
    }
    if (render) {
      return <Layout {...layoutProps}>{render(props)}</Layout>;
    }
    return <Layout {...layoutProps} />;
  };
  render() {
    const etc = omitProps(this.props, ["component", "render", "layout"]);
    return <RouteWithAuth {...etc} render={this.routeRender} />;
  }
}
