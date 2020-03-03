import React from "react";
import { FormController, FiledRender } from "./interface";

export interface FieldProps<TSF, K extends keyof TSF> {
  form: FormController<TSF>;
  name: K;
  validateOnChange?: boolean;
  render: FiledRender<TSF, K>;
  onChange?: (value: TSF[K], prevValue: TSF[K]) => void;
}

export class Field<TSF, K extends keyof TSF> extends React.Component<
  FieldProps<TSF, K>
> {
  handleChange = async (value: TSF[K]) => {
    const { form, name, validateOnChange, onChange } = this.props;
    if (form.isFieldDisabled(name)) return;
    const prevValue = form.getFieldValue(name);
    await form.setFieldValue(name, value);
    if (validateOnChange) form.validateField(name);
    if (onChange) onChange(value, prevValue);
  };

  render() {
    const { form, name, render } = this.props;
    return render({
      disabled: form.isFieldDisabled(name),
      validation: form.getFieldValidation(name),
      value: form.getFieldValue(name),
      onChange: this.handleChange,
    });
  }
}
