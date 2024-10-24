"use client";

import { Logo } from "@/components/Logo";
import { Settings } from "@/components/Settings";
import { SignOut } from "@/components/SignOut";
import { Layout } from "antd";
import React from "react";
import { useAppLayoutContext } from "..";
import { AppMenu } from "./AppMenu";

const { Sider } = Layout;

export const AppSider = () => {
  const { collapsed, backgroundColor } = useAppLayoutContext();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth="0"
      className="overflow-auto sticky h-screen top-0 bottom-0 border-r dark:border-gray-500"
      style={{ background: backgroundColor }}
    >
      <div className="flex justify-between flex-col h-full">
        <div>
          <div className="w-full my-5 flex justify-center">
            <Logo />
          </div>
          <AppMenu />
        </div>

        <div className="flex gap-2 items-center justify-between m-4 flex-col">
          <Settings iconOnly={collapsed} />
          <SignOut iconOnly={collapsed} />
        </div>
      </div>
    </Sider>
  );
};
