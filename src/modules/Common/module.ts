import { i18nModule } from "./I18n/module";
import { clientModule } from "./Client/module";

export const commonModule = {
  namespace: "Common",
  subModules: [i18nModule, clientModule],
};
