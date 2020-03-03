import React from "react";
import { FormProps, FieldValidatorFactories } from "./interface";
import { connectForm } from "./connectForm";

export function createForm<TSF, moreProps = {}>(context: {
  defaultValue: TSF;
  render: React.FC<moreProps & FormProps<TSF>>;
  validators: FieldValidatorFactories<TSF, moreProps & FormProps<TSF>>;
}) {
  return Object.assign(
    connectForm<TSF>()(context.defaultValue)(context.render, {
      validators: context.validators,
    }),
    { defaultValue: context.defaultValue },
  );
}
