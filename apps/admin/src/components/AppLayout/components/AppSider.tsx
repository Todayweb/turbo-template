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
      className="sticky top-0 bottom-0 h-screen overflow-auto border-r dark:border-gray-500"
      style={{ background: backgroundColor }}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="my-5 flex w-full justify-center">
            <Logo />
          </div>
          <AppMenu />
        </div>

        <div className="m-4 flex flex-col items-center justify-between gap-2">
          <Settings iconOnly={collapsed} />
          <SignOut iconOnly={collapsed} />
        </div>
      </div>
    </Sider>
  );
};
