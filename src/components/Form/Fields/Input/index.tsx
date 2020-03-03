import React from "react";
import { Input } from "antd";
import {
  BaseFiledRenderer,
  InferProps,
} from "../../../../packages/type-safe-form";

export const InputFactory = (
  props?: Omit<InferProps<typeof Input>, "value" | "onChange" | "disabled">,
): BaseFiledRenderer<string> => ({ value, disabled, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Input
      disabled={disabled}
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
};
