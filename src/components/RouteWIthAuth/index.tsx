import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { RouteProps, Route } from "react-router";
import {
  isAuthenticatedSelector,
  routeAuthMapSelector,
} from "../../modules/Auth/selector";
import { isRoutePathVisible } from "../../utils/isRoutePathVisible";
import { omitProps } from "../../utils/omitProps";

const mapStateToProps = createSelector(
  isAuthenticatedSelector,
  routeAuthMapSelector,
  (isAuthenticated, routeAuthMap) => ({
    isAuthenticated,
    routeAuthMap,
  }),
);

type Props = RouteProps & ReturnType<typeof mapStateToProps>;

export class UnConnectedRouteWithAuth extends React.PureComponent<Props> {
  shouldRender() {
    let { path } = this.props;
    const { isAuthenticated, routeAuthMap } = this.props;
    if (!isAuthenticated) return false;
    if (Array.isArray(path)) path = path[0];
    return path && isRoutePathVisible(path, routeAuthMap);
  }

  render() {
    const etc = omitProps(this.props, ["isAuthenticated", "routeAuthMap"]);
    if (this.shouldRender()) {
      return <Route {...etc} />;
    }
    return null;
  }
}

export const RouteWithAuth = connect(mapStateToProps)(UnConnectedRouteWithAuth);
