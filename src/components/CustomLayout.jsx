import { useState } from "react";
import { HiLanguage } from "react-icons/hi2";
import { IoBookSharp } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import Logout from "./Auth/Logout";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;

export default function CustomLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    console.log(e.key);
    setActiveKey(e.key);
  };

  return (
    <div className="">
      <Layout className="w-full min-h-[150vh] h-full ">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical mb-5" />
          <Menu
            mode="vertical"
            theme="dark"
            selectedKeys={[activeKey]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="1" icon={<IoBookSharp />}>
              <Link to="/books">Books</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PiStudent />}>
              <Link to="/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<HiLanguage />}>
              <Link to="/language">Language</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: Flex,
            }}
            className="w-full flex justify-between"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <>
              <Logout />
            </>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
