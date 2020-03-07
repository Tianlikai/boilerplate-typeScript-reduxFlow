import React from "react";
import { Validation, Validator, ValidationForm } from "./interface";

/** 获取默认检验结果 */
export const getDefaultValidation = (): Validation => ({ valid: true });

/** */
export const getDefaultValidationForm = <TSF>(): ValidationForm<TSF> => ({
  valid: false,
  messages: {},
});

/** 默认校验器 */
const defaultValidator = () => getDefaultValidation();

/** 获取默认校验器 */
export const getDefaultValidator = <T>(): Validator<T> => defaultValidator;

/**
 * 组合多个校验结果
 * @param validations 校验结果
 */
export const composeValidations = (validations: Validation[]): Validation => ({
  valid: validations.every(item => item.valid),
  message: validations.map(item => item.message),
});

/**
 * 组合多个同类校验器，生成一个并行的异步校验器
 * @param validators
 */
export const composeValidators = <T>(
  validators: Array<Validator<T>>,
): Validator<T> => data =>
  Promise.all<Validation>(validators.map(validator => validator(data))).then(
    composeValidations,
  );

/**
 * 组合多个同类校验器，生成一个串行的短路同步校验器
 * @param validators
 */
export const composeSerialValidators = <T>(
  validators: Array<Validator<T>>,
): Validator<T> => async data => {
  for (const validator of validators) {
    const validation = await validator(data);
    if (!validation.valid) return validation;
  }
  return getDefaultValidation();
};

/**
 * 检验执行器
 * @param executor 检验逻辑执行器
 * @param message 检验信息
 */
export const executorToValidator = <T>(
  executor: (v: T) => boolean,
  message: React.ReactNode,
): Validator<T> => (v): Validation => {
  const valid = executor(v);
  return {
    valid,
    message: valid ? undefined : message,
  };
};
