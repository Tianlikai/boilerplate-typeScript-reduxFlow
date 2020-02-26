import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ErrorBoundary } from "../../../components/ErrorBoundary";
import AppHeader from "./AppHeader";
import "./index.scss";

const PREFIX = "AppHeaderLayout";

type Props = RouteComponentProps;

export class UnconnectedAppHeaderLayout extends PureComponent<Props> {
  render() {
    const { children, location, match, history } = this.props;
    return (
      <div className={PREFIX}>
        <AppHeader location={location} match={match} history={history} />
        <div className="AppHeaderLayout-content">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    );
  }
}

export const AppHeaderLayout = withRouter(UnconnectedAppHeaderLayout);
