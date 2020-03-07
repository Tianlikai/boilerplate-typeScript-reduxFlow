import React from "react";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import {
  BaseFiledRenderer,
  InferProps,
} from "../../../../packages/type-safe-form";

export const CheckboxFactory = (
  props?: Omit<InferProps<typeof Checkbox>, "value" | "onChange" | "disabled">,
): BaseFiledRenderer<boolean> => ({ value, disabled, onChange }) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.checked);
  };
  return (
    <Checkbox
      disabled={disabled}
      onChange={handleChange}
      checked={value}
      {...props}
    />
  );
};
