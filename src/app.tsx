import React from "react";
import { debounce } from "lodash";
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
import { Login } from "./modules/Login";
import { Dashboard } from "./modules/Dashboard";
import { List } from "./modules/List";
import { VList } from "./modules/VList";
import { ArticleList } from "./modules/ArticleList";
import { Article } from "./modules/Article";
import { AppHeaderLayout } from "./modules/Common/Header";
import { NavRoutesProvider } from "./modules/Common/Header/NavRouterContext";
import { isAuthenticatedSelector } from "./modules/Auth/selector";
import { I18nProvider } from "./modules/Common/I18n/components/I18nProvider";
import { onResizeAction } from "./modules/Common/Client/action";
import { updateAuthenticatedAction } from "./modules/Auth/action";
import { RouteWithLayout } from "./components/RouteWithLayout";
import { navRoutes, LOGIN_URL } from "./config";
import { getFPS } from "./utils/frame";

import "./index.scss";

const TIME_INTERVAL = 200;

const mapStateToProps = createSelector(
  isAuthenticatedSelector,
  isAuthenticated => ({ isAuthenticated }),
);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateAuthenticated: updateAuthenticatedAction,
      onResize: onResizeAction,
    },
    dispatch,
  );

type AppProps = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends React.PureComponent<AppProps> {
  onResize = () => this.props.onResize({ innerHeight: window.innerHeight });
  efficientOnResize = debounce(this.onResize, TIME_INTERVAL);

  componentDidMount() {
    getFPS();
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
    window.addEventListener("resize", this.efficientOnResize);
  }

  componentDidUpdate(prevProps: AppProps) {
    if (
      this.props.isAuthenticated !== prevProps.isAuthenticated &&
      !this.props.isAuthenticated
    ) {
      this.redirect();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.efficientOnResize);
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
          <Route
            path={`${path}vList`}
            component={VList}
            // layout={AppHeaderLayout}
          />
          <RouteWithLayout
            path={`${path}articleList`}
            component={ArticleList}
            layout={AppHeaderLayout}
          />
          <RouteWithLayout
            path={`${path}article/:id`}
            component={Article}
            layout={AppHeaderLayout}
          />
          <Redirect to={`${path}articleList`} />
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
    <Provider store={store}>
      <I18nProvider>
        <ConnectedRouter history={history}>
          <ConnectedApp />
        </ConnectedRouter>
      </I18nProvider>
    </Provider>
  );
};

export const HotRootApp = hot(RootApp);
