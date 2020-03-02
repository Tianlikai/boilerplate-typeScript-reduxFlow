import { dashboardReducer } from "./reducer";
import { rootSelectorFactory } from "../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "Dashboard";

export const rootSelector = rootSelectorFactory<typeof dashboardReducer>(
  NAMESPACE,
);
