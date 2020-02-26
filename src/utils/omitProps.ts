/**
 * 挑出A中属于B的属性
 * Pick<A, B>
 *
 * 移除A中属于B的属性
 * Exclude<A, B>
 */
import { omit } from "lodash";

/**
 * 从target中去除omitKeys
 * @param target
 * @param omitKeys
 */
export const omitProps = <T extends object, U extends keyof T>(
  target: T,
  omitKeys: U[],
): Pick<T, Exclude<keyof T, U>> => omit(target, omitKeys) as any;
