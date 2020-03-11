import update from "immutability-helper";
import { IntlShape } from "react-intl";
import { AnyAction } from "redux";
import { updateI18nActions } from "./action";
import { ZH_CN } from "./constant";

interface State {
  locale: string;
  messages: IntlShape["messages"];
}

const initState: State = {
  locale: ZH_CN,
  messages: {},
};

export const i18nProviderReducer = (
  state = initState,
  action: AnyAction,
): State => {
  if (updateI18nActions.success.match(action)) {
    return update(state, {
      locale: { $set: action.payload.locale },
      messages: { $set: action.payload.messages },
    });
  }
  return state;
};
