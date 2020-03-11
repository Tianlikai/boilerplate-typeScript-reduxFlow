import { authModule } from "./modules/Auth/module";
import { dashboardModule } from "./modules/Dashboard/module";
import { i18nModule } from "./modules/Common/I18n/module";
import { listModule } from "./modules/List/module";

export const getModules = () => [
  authModule,
  dashboardModule,
  i18nModule,
  listModule,
];
