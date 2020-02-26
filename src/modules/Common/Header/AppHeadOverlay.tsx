import React from "react";
import { Dropdown, Menu } from "antd";

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
    <Dropdown overlay={menu} placement="bottomCenter">
      <div>header</div>
    </Dropdown>
  );
};

export default AppHeadOverlay;
