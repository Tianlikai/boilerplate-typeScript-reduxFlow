import { createSelector } from "reselect";
import { i18nProviderReducer } from "./reducer";
import { rootSelectorFactory } from "../../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "I18nProvider";

export const rootSelector = rootSelectorFactory<typeof i18nProviderReducer>(
  NAMESPACE,
);

export const localeSelector = createSelector(
  rootSelector,
  state => state.locale,
);
