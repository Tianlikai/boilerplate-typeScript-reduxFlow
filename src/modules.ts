import { authModule } from "./modules/Auth/module";
import { dashboardModule } from "./modules/Dashboard/module";
import { listModule } from "./modules/List/module";
export const getModules = () => [authModule, dashboardModule, listModule];
