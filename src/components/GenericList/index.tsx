import React from "react";
import _ from "lodash";
import classnames from "classnames";
import { GenericListProps } from "./interface";

export default class GenericList<T> extends React.PureComponent<
  GenericListProps<T>
> {
  render() {
    const { className, items, itemRender } = this.props;
    return (
      <div className={classnames(className)}>{_.map(items, itemRender)}</div>
    );
  }
}
