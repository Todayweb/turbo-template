"use client";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { useAppLayoutContext } from "..";

const { Header } = Layout;

export const AppHeader = () => {
  const { setCollapsed, collapsed, backgroundColor } = useAppLayoutContext();

  return (
    <Header
      className="pr-6 pl-0 sticky top-0 right-0 border-b dark:border-gray-500"
      style={{ background: backgroundColor }}
    >
      <div className="flex justify-between w-full">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed((prev) => !prev)}
          className="w-16 h-16 rounded-none"
        />
      </div>
    </Header>
  );
};
