import classNames from "classnames";
import React, { ReactNode } from "react";
interface Props {
  className?: string;
  clsPrefix: string;
  label: ReactNode;
}
export const FormFieldWrapper: React.FC<Props> = React.memo(
  ({ clsPrefix, className, label, children }) => (
    // 可复用的组件通常会暴露className参数用于样式覆盖
    <div className={classNames(`${clsPrefix}-fieldWrapper`, className)}>
      <label className={`${clsPrefix}-label`}>{label}</label>
      <div className={`${clsPrefix}-field`}>{children}</div>
    </div>
  ),
);
