import React from "react";
import "./index.scss";

const PREFIX = "VListItem";

interface VListItemProps {
  value: string;
  height?: number | string;
  lineHeight?: number | string;
}

const VListItem: React.FC<VListItemProps> = ({ value, height, lineHeight }) => {
  const style: React.CSSProperties = {
    height,
    lineHeight,
  };
  return (
    <div className={PREFIX} style={style}>
      {value}
    </div>
  );
};

export default VListItem;
