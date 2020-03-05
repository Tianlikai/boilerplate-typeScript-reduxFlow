import React from "react";
import ReactDom from "react-dom";
import { MyModule } from "./model";
import { Middleware, combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { Effect, fork } from "redux-saga/effects";
import { configureStore } from "./store";
import { flexible } from "./flexible";

export class BootStrap {
  private history: History<any> | undefined;
  private modules: MyModule[] = [];
  private root: HTMLDivElement | undefined;
  private store: ReturnType<typeof configureStore> | undefined;
  private HotRootApp: React.ElementType<any>;

  private moduleVisitor(
    modules: MyModule[],
    visitor: (module: MyModule) => void,
  ) {
    const stack = modules.slice(0);
    for (let curModule = stack.pop(); curModule; curModule = stack.pop()) {
      visitor(curModule);
      const { subModules } = curModule;
      if (subModules && subModules.length > 0) {
        [].push.apply(stack, subModules);
      }
    }
  }

  private composeReducer(history: History<any>, modules: MyModule[]) {
    const reducerDictionary = {
      router: connectRouter(history),
    };
    this.moduleVisitor(modules, curModule => {
      const { namespace, reducer } = curModule;
      if (reducer) {
        reducerDictionary[namespace] = reducer;
      }
    });
    return combineReducers(reducerDictionary);
  }

  private flattenSaga(modules: MyModule[]) {
    const sagaList: Effect[] = [];
    this.moduleVisitor(modules, curModule => {
      if (curModule.saga) {
        sagaList.push(fork(curModule.saga));
      }
    });
    return sagaList;
  }

  route(HotRootApp: React.ElementType<any>) {
    this.HotRootApp = HotRootApp;
  }

  module(modules: MyModule[]) {
    this.modules = modules;
  }

  initStore(
    customMiddleware: Middleware[],
    history: History,
    initialState: any,
  ) {
    const store = configureStore(
      history,
      this.composeReducer(history, this.modules),
      this.flattenSaga(this.modules),
      initialState,
      customMiddleware,
    );
    this.history = history;
    this.store = store;
    return store;
  }

  start(
    root: HTMLDivElement,
    history: History,
    customMiddleware: Middleware[],
    initialState: any,
  ) {
    flexible();
    this.root = root;
    const store = this.initStore(customMiddleware, history, initialState);
    const HotRootApp = this.HotRootApp;
    ReactDom.render(<HotRootApp store={store} history={history} />, root);
  }

  hotReload(modules: MyModule[]) {
    this.module(modules);
    if (this.store && this.history) {
      this.store.replaceReducer(this.composeReducer(this.history, modules));
      this.store.replaceSaga(this.flattenSaga(modules));
    }
  }

  unMount() {
    if (this.root) {
      ReactDom.unmountComponentAtNode(this.root);
      this.root = undefined;
    }
  }
}
