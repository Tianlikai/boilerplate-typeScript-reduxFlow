import React from "react";
import memoizeOne from "memoize-one";
import VListItem from "./ListItem";

import "./index.scss";

const PREFIX = "VList";

const initList = (count: number) => {
  const list = [];
  for (let i = 1; i <= count; i++) {
    list.push({ value: `${i}` });
  }
  return list;
};

interface VListState {
  count: number;
  itemHeight: number;
  list: { value: string }[];
}

export default class VList extends React.PureComponent<{}, VListState> {
  private divRef = React.createRef<HTMLDivElement>();
  private start: number;
  private end: number;
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 500,
      itemHeight: 100,
      list: initList(500),
    };
  }

  componentDidMount() {
    if (this.divRef.current) {
      const { itemHeight } = this.state;
      const { scrollHeight } = this.divRef.current;
      const visibleCount = Math.ceil(scrollHeight / itemHeight);
      this.start = 0;
      this.end = this.start + visibleCount;
      console.log(this.end);
    }
  }

  calculateHeight = memoizeOne(
    (count: number, itemHeight: number) => count * itemHeight,
  );

  handleScroll = () => {
    if (this.divRef.current) {
      const { scrollTop } = this.divRef.current;
      console.log(scrollTop);
    }
  };

  render() {
    const { count, itemHeight, list } = this.state;
    const virtualScrollStyle: React.CSSProperties = {
      height: this.calculateHeight(count, itemHeight),
    };
    return (
      <div ref={this.divRef} className={PREFIX} onScroll={this.handleScroll}>
        <div className={`${PREFIX}-header`}>header</div>
        <div className={`${PREFIX}-nav`}>nav</div>
        <div className={`${PREFIX}-scroll`} style={virtualScrollStyle}></div>
        <div className={`${PREFIX}-vList`}>
          {list.map(item => (
            <VListItem
              key={item.value}
              value={item.value}
              height={itemHeight}
              lineHeight={`${itemHeight}px`}
            />
          ))}
        </div>
      </div>
    );
  }
}
