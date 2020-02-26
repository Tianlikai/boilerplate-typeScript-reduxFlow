import { createSelector } from "reselect";
import { authReducer } from "./reducer";
import { rootSelectorFactory } from "../../packages/bootstrap/rootSelectorFactory";
import { Dictionary } from "../../utils/DictionaryType";

const NAMESPACE = "Auth";

export const rootSelector = rootSelectorFactory<typeof authReducer>(NAMESPACE);

export const isAuthenticatedSelector = createSelector(
  rootSelector,
  auth => auth.isAuthenticated,
);

export const routeAuthMapSelector = createSelector(
  () => ({}),
  () => {
    /**
     * 调用API后此处可以进行业务判断是否具有页面权限
     * key: routePath, value: boolean
     * 这里默认给所有路由权限为true
     */
    const routeAuthMap: Dictionary<boolean> = {
      "/dashboard": true,
      "/list": true,
    };
    return routeAuthMap;
  },
);
