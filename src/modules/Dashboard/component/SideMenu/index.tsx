import React from "react";
import classnames from "classnames";
import { Tooltip } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss";

const PREFIX = "DashboardSideMenu";
const PREFIX_ITEM = "DashboardSideMenuItem";

interface Props {
  className?: string;
}

export default class SideMenu extends React.PureComponent<Props> {
  render() {
    const { className } = this.props;
    return (
      <div className={classnames(className, PREFIX)}>
        <div className={`${PREFIX}-title`}>仪表盘列表</div>
        <div className={`${PREFIX}-list`}>
          <div className={PREFIX_ITEM}>
            <span className={`${PREFIX_ITEM}-sort active`}>1</span>
            <span className={`${PREFIX_ITEM}-name`}>个人看板</span>
            <Tooltip title="删除">
              <CloseOutlined className={`${PREFIX_ITEM}-delete`} />
            </Tooltip>
          </div>
        </div>
        <div className={`${PREFIX}-title`}>自定义</div>
        <div className={`${PREFIX}-list`}>
          <div className={`${PREFIX_ITEM} custom`}>
            <PlusOutlined className={`${PREFIX_ITEM}-add`} />
            <span className={`${PREFIX_ITEM}-name`}>新建仪表盘</span>
          </div>
        </div>
      </div>
    );
  }
}
