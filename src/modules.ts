import { authModule } from "./modules/Auth/module";
import { listModule } from "./modules/List/module";

export const getModules = () => [authModule, listModule];
