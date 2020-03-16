import React from "react";

export const STYLE_INNER: React.CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "100%",
};

export const STYLE_WRAPPER: React.CSSProperties = {
  overflow: "auto",
  willChange: "transform",
  WebkitOverflowScrolling: "touch",
};

export enum SCROLL_CHANGE_REASON {
  OBSERVED = "observed",
  REQUESTED = "requested",
}

export enum ALIGNMENT {
  AUTO = "auto",
  START = "start",
  CENTER = "center",
  END = "end",
}

export enum DIRECTION {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export const scrollProp = {
  [DIRECTION.VERTICAL]: "scrollTop",
  [DIRECTION.HORIZONTAL]: "scrollLeft",
};

export const sizeProp = {
  [DIRECTION.VERTICAL]: "height",
  [DIRECTION.HORIZONTAL]: "width",
};

export const positionProp = {
  [DIRECTION.VERTICAL]: "top",
  [DIRECTION.HORIZONTAL]: "left",
};

export const marginProp = {
  [DIRECTION.VERTICAL]: "marginTop",
  [DIRECTION.HORIZONTAL]: "marginLeft",
};

export const oppositeMarginProp = {
  [DIRECTION.VERTICAL]: "marginBottom",
  [DIRECTION.HORIZONTAL]: "marginRight",
};
