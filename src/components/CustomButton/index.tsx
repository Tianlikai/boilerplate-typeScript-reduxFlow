import React from "react";
import classnames from "classnames";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import "./index.scss";

const PREFIX = "CustomButton";

const CustomButton: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  ...rest
}) => (
  <Button
    className={classnames(className, PREFIX, {
      [`${PREFIX}-${type}`]: type,
    })}
    type={type}
    {...rest}
  >
    {children}
  </Button>
);

export default CustomButton;
