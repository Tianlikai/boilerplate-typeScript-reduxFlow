import { Effect } from "redux-saga/effects";

declare global {
  /**
   * 用于推导saga call, select等effect的返回类型
   * @example const res:SR<typeof api> = yield call(api);
   */
  type SagaEffectReturn<T> = T extends (...args: any[]) => any
    ? ReturnType<T> extends IterableIterator<infer K1>
      ? Exclude<K1, Effect>
      : ReturnType<T> extends PromiseLike<infer K2>
      ? K2
      : ReturnType<T>
    : never;
  /**
   * alias of SagaEffectReturn
   *
   * 用于推导saga call, select等effect的返回类型
   * @example const res:SR<typeof api> = yield call(api);
   * @example const state:SR<typeof stateSelector> = yield select(stateSelector);
   */
  type SR<T> = SagaEffectReturn<T>;
}
