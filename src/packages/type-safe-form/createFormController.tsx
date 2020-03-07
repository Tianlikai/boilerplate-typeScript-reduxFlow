import React from "react";
import {
  getDefaultValidator,
  getDefaultValidation,
  composeValidations,
  getDefaultValidationForm,
} from "./valid";
import {
  OuterFormProps,
  FormState,
  FormController,
  FieldValidatorFactories,
  BaseForm,
} from "./interface";

export function createFormController<TSF, T>(
  ref: React.Component<OuterFormProps<TSF>, FormState<TSF>> & {
    componentDidUpdateListeners: Set<() => void>;
  },
  defaultValue: TSF,
  validators: FieldValidatorFactories<TSF, T>,
): FormController<TSF> {
  type FC = FormController<TSF>;

  const children = new Set<BaseForm>();

  const add: FC["add"] = child => children.add(child);

  const remove: FC["remove"] = child => children.delete(child);

  const getFieldsForValidation = <K extends keyof TSF>(): K[] =>
    Object.keys(validators) as any;

  const setState = (state: Partial<FormState<TSF>>) =>
    new Promise(resolve => ref.setState(state as FormState<TSF>, resolve));

  const getValue: FC["getValue"] = () => ref.props.value || ref.state.value;

  const setValue: FC["setValue"] = async (value: TSF) => {
    if (ref.props.value) {
      if (ref.props.onChange) {
        ref.props.onChange(value);
        // 阻塞ComponentDidUpdate
        await new Promise(resolve => {
          const cb = () => {
            ref.componentDidUpdateListeners.delete(cb);
            resolve();
          };
          ref.componentDidUpdateListeners.add(cb);
        });
      }
    } else {
      await setState({ value });
      if (ref.props.onChange) ref.props.onChange(value);
    }
  };

  const setFieldsValue: FC["setFieldsValue"] = async (
    value: Partial<FormState<TSF>>,
  ) => {
    await setValue(Object.assign({}, getValue(), value));
  };

  const getFieldValue: FC["getFieldValue"] = key => getValue()[key];

  const setFieldValue: FC["setFieldValue"] = async (key, value) => {
    await setValue(Object.assign({}, getValue(), { [key]: value }));
  };

  const getFieldValidator: FC["getFieldValidator"] = key => {
    const factory = validators[key];
    if (factory) {
      return factory(ref as any);
    }
    return getDefaultValidator();
  };

  const getFieldValidation: FC["getFieldValidation"] = key =>
    (ref.state.validation[key] || getDefaultValidation()) as any;

  const setFieldValidation: FC["setFieldValidation"] = async (
    key,
    validation,
  ) => {
    const newValidation = Object.assign({}, ref.state.validation, {
      [key]: validation,
    });
    await setState({ validation: newValidation });
  };

  const validateField: FC["validateField"] = async key => {
    const validation = await Promise.resolve(
      getFieldValidator(key)(getFieldValue(key)),
    );
    await setFieldValidation(key, validation);
    return validation;
  };

  const validateAllFields: FC["validateAllFields"] = async () => {
    const fieldKeys = getFieldsForValidation();
    const validations = await Promise.all(
      fieldKeys.map(filedKey =>
        getFieldValidator(filedKey)(getFieldValue(filedKey)),
      ),
    );
    const newValidation: FormState<TSF>["validation"] = {};
    validations.forEach((validation, i) => {
      newValidation[fieldKeys[i]] = validation;
    });
    await setState({ validation: newValidation });
    return composeValidations(validations);
  };

  const validate: FC["validate"] = async () => {
    const validations = await Promise.all([
      validateAllFields(),
      ...[...children.values()].map(child => child.validate()),
    ]);
    return composeValidations(validations);
  };

  const isFieldDisabled: FC["isFieldDisabled"] = key =>
    !!(ref.props.disabled || ref.state.disabled[key]);

  const setFieldDisabled: FC["setFieldDisabled"] = async (key, disable) => {
    const newDisabled = Object.assign({}, ref.state.disabled, {
      [key]: disable,
    });
    await setState({ disabled: newDisabled });
  };

  const clearValue: FC["clearValue"] = async () => {
    await setValue(defaultValue);
  };

  const clearFieldsValue: FC["clearFieldsValue"] = async keys => {
    const newValue = { ...getValue() };
    keys.forEach(key => {
      newValue[key] = defaultValue[key];
    });
    await setValue(newValue);
  };

  const getValidationForm: FC["getValidationForm"] = () =>
    ref.props.validationForm || getDefaultValidationForm<TSF>();

  return {
    add,
    remove,
    getValue,
    setValue,
    setFieldsValue,
    getFieldValue,
    setFieldValue,
    getFieldValidator,
    getFieldValidation,
    setFieldValidation,
    validateField,
    validateAllFields,
    validate,
    isFieldDisabled,
    setFieldDisabled,
    clearValue,
    clearFieldsValue,
    getValidationForm,
  };
}
