import React from "react";
import { map } from "lodash";
import classnames from "classnames";
import { GenericListProps } from "./interface";

export default class GenericList<T> extends React.PureComponent<
  GenericListProps<T>
> {
  render() {
    const { className, items, itemRender } = this.props;
    return (
      <div className={classnames(className)}>{map(items, itemRender)}</div>
    );
  }
}
