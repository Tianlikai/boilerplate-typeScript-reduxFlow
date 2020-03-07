import React from "react";
import classnames from "classnames";
import {
  FiledRenderBinding,
  FormProps,
  Field,
} from "../../../packages/type-safe-form";

const PREFIX = "SimpleForm";
const FORM_ITEM = "SimpleFormItem";

export function simpleFormFactory<TSF>(context: {
  fields: Array<
    FiledRenderBinding<TSF> & { label: React.ReactNode; className?: string }
  >;
}): React.FC<FormProps<TSF>> {
  return props => {
    return (
      <div className={classnames(PREFIX)}>
        {context.fields.map(filed => {
          const { valid, message } = props.form.getFieldValidation(filed.name);
          const { valid: validForm, messages } = props.form.getValidationForm();
          return (
            <div
              key={`${filed.name}`}
              className={classnames(FORM_ITEM, filed.className)}
            >
              <span className={`${FORM_ITEM}-label`}>{filed.label}</span>
              <span className={`${FORM_ITEM}-filedWrapper`}>
                <Field
                  form={props.form}
                  name={filed.name}
                  render={filed.render}
                />
              </span>
              <span
                className={classnames(`${FORM_ITEM}-error`, {
                  ["is-hide"]: validForm && valid,
                })}
              >
                {messages[filed.name] || message}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
}
