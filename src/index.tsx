import { createHashHistory } from "history";
import { BootStrap } from "./packages/bootstrap";
import { getModules } from "./modules";
import { HotRootApp } from "./app";

const bootStrap = new BootStrap();
const history = createHashHistory();

bootStrap.module(getModules());
bootStrap.route(HotRootApp);
bootStrap.start(
  document.querySelector("#root") as HTMLDivElement,
  history,
  [],
  undefined,
);

/* eslint-disable*/
if (module.hot) {
  module.hot.accept("./modules", () => {
    const { getModules: getNewModules } = require("./modules");
    bootStrap.hotReload(getNewModules());
  });
}
