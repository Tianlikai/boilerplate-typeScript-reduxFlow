import React from "react";
import { ItemSize } from "./SizeAndPositionManager";
import { ALIGNMENT, DIRECTION } from "./constants";

export type ItemPosition = "absolute" | "sticky";

export interface ItemStyle {
  position: ItemPosition;
  top?: number;
  left: number;
  width: string | number;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  zIndex?: number;
}

export interface ItemInfo {
  index: number;
  style: ItemStyle;
}

interface RenderedRows {
  startIndex: number;
  stopIndex: number;
}

export interface VListProps {
  className?: string;
  estimatedItemSize?: number;
  height: number | string;
  itemCount: number;
  itemSize: ItemSize;
  overscanCount?: number;
  scrollOffset?: number;
  scrollToIndex?: number;
  scrollToAlignment?: ALIGNMENT;
  scrollDirection?: DIRECTION;
  stickyIndices?: number[];
  style?: React.CSSProperties;
  width?: number | string;
  onItemsRendered?({ startIndex, stopIndex }: RenderedRows): void;
  onScroll?(offset: number, event: UIEvent): void;
  renderItem(itemInfo: ItemInfo): React.ReactNode;
}
