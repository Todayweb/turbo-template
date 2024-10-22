"use client";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import React, { useState, type PropsWithChildren } from "react";
import { Logo } from "./Logo";
import { Settings } from "./Settings";
import { SignOut } from "./SignOut";

const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

export const AppLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="overflow-auto sticky h-screen top-0 bottom-0 border-r dark:border-gray-500"
        style={{ background: colorBgContainer }}
      >
        <div className="flex justify-between flex-col h-full">
          <div>
            <div className="w-full my-4 flex justify-center">
              <Logo />
            </div>
            <Menu
              className="border-r-0"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
              style={{ background: colorBgContainer }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between m-4 flex-col">
            <Settings iconOnly={collapsed} />
            <SignOut iconOnly={collapsed} />
          </div>
        </div>
      </Sider>

      <Layout>
        <Header
          className="pr-6 pl-0 sticky top-0 right-0 border-b dark:border-gray-500"
          style={{ background: colorBgContainer }}
        >
          <div className="flex justify-between w-full">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="w-16 h-16 rounded-none"
            />
          </div>
        </Header>
        <Content className="my-6 mx-4">
          <div className="p-6 rounded-md" style={{ background: colorBgContainer }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
