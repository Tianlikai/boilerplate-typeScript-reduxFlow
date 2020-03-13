import React from "react";
import { Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
      <UserOutlined className="AppHeadOverlay-icon" />
    </Dropdown>
  );
};

export default AppHeadOverlay;
