import { i18nProviderReducer } from "./reducer";
import { i18nSaga } from "./saga";

export const i18nModule = {
  namespace: "I18nProvider",
  reducer: i18nProviderReducer,
  saga: i18nSaga,
};
