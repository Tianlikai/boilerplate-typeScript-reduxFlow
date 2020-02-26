import { Dictionary } from "./DictionaryType";

export const isRoutePathVisible = (
  path: string,
  routeAuthMap: Dictionary<boolean>,
) => routeAuthMap[path] || false;
