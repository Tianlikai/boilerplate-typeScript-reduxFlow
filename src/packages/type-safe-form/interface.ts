import React from "react";

export type InferProps<T> = T extends React.ComponentType<infer K> ? K : never;

/** 字段校验结果 */
export interface Validation {
  valid: boolean;
  message?: React.ReactNode;
}

export interface ValidationForm<TSF> {
  valid: boolean;
  messages: { [K in keyof TSF]?: React.ReactNode };
}

/** 表单字段校验器 */
export type SyncValidator<T> = (value: T) => Validation;
export type AsyncValidator<T> = (value: T) => PromiseLike<Validation>;
export type Validator<T> = SyncValidator<T> | AsyncValidator<T>;

export type BaseParentForm = {
  add: (form: BaseForm) => void;
  remove: (form: BaseForm) => void;
};

export type BaseChildForm = {
  validate: () => PromiseLike<Validation>;
};

export type BaseForm = BaseParentForm & BaseChildForm;

export interface FormController<TSF> extends BaseForm {
  /**
   * 获取表单的值
   */
  getValue(): TSF;
  /**
   * 设置表单的值
   */
  setValue(value: TSF): PromiseLike<void>;
  /**
   * 批量设置字段的值
   */
  setFieldsValue(value: Partial<TSF>): PromiseLike<void>;
  /**
   * 获取表单字段的值
   */
  getFieldValue<K extends keyof TSF>(key: K): TSF[K];
  /**
   * 设置表单字段的值
   */
  setFieldValue<K extends keyof TSF>(key: K, value: TSF[K]): PromiseLike<void>;
  /**
   * 获取表单验证器
   */
  getFieldValidator<K extends keyof TSF>(key: K): Validator<TSF[K]>;
  /**
   * 获取表单字段的校验结果
   */
  getFieldValidation<K extends keyof TSF>(key: K): Validation;
  /**
   * 设置字段的校验结果
   */
  setFieldValidation<K extends keyof TSF>(
    key: K,
    validation: Validation,
  ): PromiseLike<void>;
  /**
   * 执行单字段校验，并设置校验结果
   */
  validateField<K extends keyof TSF>(key: K): PromiseLike<Validation>;
  /**
   * 执行全字段校验，并设置校验结果
   */
  validateAllFields(): PromiseLike<Validation>;
  /**
   * 字段是否被禁用
   */
  isFieldDisabled<K extends keyof TSF>(key: K): boolean;
  /**
   * 设置字段被禁用
   */
  setFieldDisabled<K extends keyof TSF>(
    key: K,
    disabled: boolean,
  ): PromiseLike<void>;
  /**
   * 清空表单的值，变更为表单默认值
   */
  clearValue(): PromiseLike<void>;
  /**
   * 清空表单若干字段
   */
  clearFieldsValue<K extends keyof TSF>(keys: K[]): PromiseLike<void>;
  /**
   * 获取表单验证情况
   */
  getValidationForm(): ValidationForm<TSF>;
}

/** 表单校验工厂 */
export type FieldValidatorFactory<TSF, Props, K extends keyof TSF> = (ref: {
  form: FormController<TSF>;
  props: Props;
}) => Validator<TSF[K]>;

export type FieldValidatorFactories<TSF, Props> = {
  [K in keyof TSF]?: FieldValidatorFactory<TSF, Props, K>;
};

export interface FormProps<TSF> {
  /** 表单控制器 */
  form: FormController<TSF>;
  /** 表单是否禁用 */
  disabled?: boolean;
}

export interface FormContext<TSF, Props> {
  validators?: FieldValidatorFactories<TSF, Props>;
}

export interface FormState<TSF> {
  value: TSF;
  validation: { [K in keyof TSF]?: Validation };
  disabled: { [K in keyof TSF]?: boolean };
}

export interface OuterFormProps<TSF> {
  disabled?: boolean;
  initValue?: TSF;
  parent?: BaseParentForm;
  value?: TSF;
  validationForm?: ValidationForm<TSF>;
  onChange?: (value: TSF) => void;
}

/**
 * 表单字段通用接口
 */
export interface BaseFieldRendererProps<FieldValueType> {
  disabled: boolean;
  validation: Validation;
  value: FieldValueType;
  onChange: (value: FieldValueType) => void;
}

export type FieldRendererProps<
  TSF,
  K extends keyof TSF
> = BaseFieldRendererProps<TSF[K]>;

/**
 * 表单字段渲染器
 */
export type FiledRender<TSF, K extends keyof TSF> = (
  props: FieldRendererProps<TSF, K>,
) => React.ReactNode;

export type BaseFiledRenderer<FieldValueType> = (
  props: BaseFieldRendererProps<FieldValueType>,
) => React.ReactNode;

export type FiledRenderBinding<TSF> = {
  name: keyof TSF;
  render: BaseFiledRenderer<TSF[keyof TSF]>;
};
