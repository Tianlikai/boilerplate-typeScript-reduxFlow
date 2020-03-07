import React from "react";
import {
  FormContext,
  FormProps,
  FormState,
  InferProps,
  OuterFormProps,
  BaseParentForm,
} from "./interface";
import { createFormController } from "./createFormController";
import { omitProps } from "./omitProps";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export const connectForm = <TSF,>() => (defaultValue: TSF) => <
  T extends React.ComponentType<FormProps<TSF> & InferProps<T>>
>(
  component: T,
  context?: FormContext<TSF, InferProps<T>>,
) =>
  class Form extends React.Component<
    Omit<InferProps<T>, "form"> & OuterFormProps<TSF>,
    FormState<TSF>
  > {
    static displayName = `TSForm(${component.displayName ||
      component.name ||
      ""})`;

    form = createFormController(
      this,
      defaultValue,
      (context && context.validators) || {},
    );
    componentDidUpdateListeners = new Set<() => void>();
    state = {
      value: this.props.initValue || defaultValue,
      validation: {},
      disabled: {},
    } as any;
    parent: BaseParentForm | null = null;

    addChild() {
      if (this.props.parent) {
        this.parent = this.props.parent as any;
        this.props.parent.add(this.form);
      }
    }

    removeChild() {
      if (this.parent) {
        this.parent.remove(this.form);
        this.parent = null;
      }
    }

    componentDidMount() {
      this.addChild();
    }

    componentDidUpdate() {
      if (this.parent !== this.props.parent) {
        this.removeChild();
        this.addChild();
      }
      this.componentDidUpdateListeners.forEach(listener => listener());
    }

    componentWillUnmount() {
      this.removeChild();
    }

    render(): React.ReactNode {
      const { disabled = false, ...rest } = omitProps(this.props, [
        "initValue",
        "value",
        "onChange",
      ]);
      return React.createElement(
        component,
        Object.assign(rest, {
          form: { ...this.form },
          disabled: disabled,
        }) as any,
      );
    }
  };
