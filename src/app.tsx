import dayJs from "dayjs";
import React from "react";
import { hot } from "react-hot-loader/root";
import { createSelector } from "reselect";
import { Provider, connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { ConnectedRouter } from "connected-react-router";
import {
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
  Route,
} from "react-router-dom";
import { History } from "history";
import "dayjs/locale/zh-cn";
import { Login } from "./modules/Login";
import { Dashboard } from "./modules/Dashboard";
import { List } from "./modules/List";
import { AppHeaderLayout } from "./modules/Common/Header";
import { NavRoutesProvider } from "./modules/Common/Header/NavRouterContext";
import { isAuthenticatedSelector } from "./modules/Auth/selector";
import { updateAuthenticated } from "./modules/Auth/action";
import { RouteWithLayout } from "./components/RouteWithLayout";
import { navRoutes, LOGIN_URL } from "./config";

import { ZH_CN, I18nProvider } from "./packages/I18nProvider";

import "./index.scss";

dayJs.locale("zh-cn");

const mapStateToProps = createSelector(
  isAuthenticatedSelector,
  isAuthenticated => ({ isAuthenticated }),
);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateAuthenticated }, dispatch);

type AppProps = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends React.PureComponent<AppProps> {
  componentDidMount() {
    const {
      isAuthenticated,
      location: { pathname },
      updateAuthenticated,
    } = this.props;
    const isAuthenticatedFromLocal = localStorage.getItem("isAuthenticated");
    if (isAuthenticatedFromLocal === "1") {
      updateAuthenticated({ isAuthenticated: true });
    } else if (!isAuthenticated && pathname !== LOGIN_URL) {
      this.redirect();
    }
  }

  componentDidUpdate(prevProps: AppProps) {
    if (
      this.props.isAuthenticated !== prevProps.isAuthenticated &&
      !this.props.isAuthenticated
    ) {
      this.redirect();
    }
  }

  redirect() {
    const {
      location: { pathname },
      history,
    } = this.props;
    history.replace(`${LOGIN_URL}?${pathname}`);
  }

  render() {
    const {
      match: { path },
    } = this.props;
    return (
      <NavRoutesProvider value={{ navRoutes }}>
        <Switch>
          <Route path={`${path}login`} component={Login} />
          <RouteWithLayout
            path={`${path}dashboard`}
            component={Dashboard}
            layout={AppHeaderLayout}
          />
          <RouteWithLayout
            path={`${path}list`}
            component={List}
            layout={AppHeaderLayout}
          />
          <Redirect to={`${path}list`} />
        </Switch>
      </NavRoutesProvider>
    );
  }
}

const ConnectedApp = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App),
);

const RootApp: React.SFC<{ store: any; history: History<any> }> = ({
  store,
  history,
}) => {
  return (
    <I18nProvider locale={ZH_CN}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedApp />
        </ConnectedRouter>
      </Provider>
    </I18nProvider>
  );
};

export const HotRootApp = hot(RootApp);
