import { IntlShape } from "react-intl";
import {
  ActionCreator,
  AsyncGroupCreator,
} from "../../../packages/flux-payload-action";

const NAMESPACE = "I18nProvider";

export const initI18nAction = ActionCreator<void>(`${NAMESPACE}/initI18n`);

export const updateI18nActions = AsyncGroupCreator<
  {
    locale: string;
  },
  {
    locale: string;
    messages: IntlShape["messages"];
  },
  void
>(`${NAMESPACE}/updateI18n`);
