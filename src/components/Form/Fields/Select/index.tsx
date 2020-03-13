import React from "react";
import { Select } from "antd";
import {
  BaseFiledRenderer,
  InferProps,
} from "../../../../packages/type-safe-form";

export const SelectFactory = (
  props?: Omit<
    InferProps<typeof Select>,
    "values" | "onChange" | "disabled" | "triggerContent"
  >,
): BaseFiledRenderer<string[]> => ({ value, onChange }) => {
  return <Select onChange={onChange} value={value} {...props} />;
};
