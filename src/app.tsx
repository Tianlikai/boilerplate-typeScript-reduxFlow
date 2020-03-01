import "lib-flexible";
import dayJs from "dayjs";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import {
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { History } from "history";
import "dayjs/locale/zh-cn";
import { NavRoutesProvider } from "./modules/Common/Header/NavRouterContext";
import { Dashboard } from "./modules/Dashboard";
import { List } from "./modules/List";
import { AppHeaderLayout } from "./modules/Common/Header";
import { RouteWithLayout } from "./components/RouteWithLayout";

dayJs.locale("zh-cn");

const navRoutes = [
  { label: "仪表盘", url: "/dashboard" },
  { label: "列表页", url: "/list" },
];

type AppProps = RouteComponentProps;

const App: React.FC<AppProps> = ({ match: { path } }: AppProps) => {
  return (
    <NavRoutesProvider value={{ navRoutes }}>
      <Switch>
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
        <Redirect to={`${path}dashboard`} />
      </Switch>
    </NavRoutesProvider>
  );
};

const ConnectedApp = withRouter(App);

const RootApp: React.SFC<{ store: any; history: History<any> }> = ({
  store,
  history,
}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedApp />
      </ConnectedRouter>
    </Provider>
  );
};

export const HotRootApp = hot(RootApp);
