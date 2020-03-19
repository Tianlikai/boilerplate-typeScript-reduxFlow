import { createSelector } from "reselect";
import { clientReducer } from "./reducer";
import { rootSelectorFactory } from "../../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "Common/Client";

export const rootSelector = rootSelectorFactory<typeof clientReducer>(
  NAMESPACE,
);

export const isPcSelector = createSelector(rootSelector, state => state.isPc);

export const innerHeightSelector = createSelector(
  rootSelector,
  state => state.innerHeight,
);
