import { articleListModule } from "./modules/ArticleList/module";
import { authModule } from "./modules/Auth/module";
import { commonModule } from "./modules/Common/module";
import { dashboardModule } from "./modules/Dashboard/module";
import { listModule } from "./modules/List/module";

export const getModules = () => [
  articleListModule,
  authModule,
  commonModule,
  dashboardModule,
  listModule,
];
