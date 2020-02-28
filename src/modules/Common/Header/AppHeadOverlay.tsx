import React from "react";
import { Dropdown, Icon, Menu } from "antd";

interface Props {
  logout: () => void;
}

const AppHeadOverlay: React.FC<Props> = ({ logout }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>退出系统</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Icon className="AppHeadOverlay-icon" type="user" />
    </Dropdown>
  );
};

export default AppHeadOverlay;
