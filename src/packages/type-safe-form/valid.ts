import { Validation, Validator } from "./interface";

export const getDefaultValidation = (): Validation => ({ valid: true });

const defaultValidator = () => getDefaultValidation();

export const getDefaultValidator = <T>(): Validator<T> => defaultValidator;

export const composeValidations = (validations: Validation[]): Validation => ({
  valid: validations.every(item => item.valid),
  message: validations.map(item => item.message),
});
