"use client";

import { Logo } from "@/components/Logo";
import { Settings } from "@/components/Settings";
import { SignOut } from "@/components/SignOut";
import { getPathKey } from "@/utils/getPathKey";
import { Layout, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAppLayoutContext } from "..";

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
          <AppSiderMenu />
        </div>

        <div className="m-4 flex flex-col items-center justify-between gap-2">
          <Settings />
          <SignOut />
        </div>
      </div>
    </Sider>
  );
};

const AppSiderMenu = () => {
  const { menuItems, backgroundColor } = useAppLayoutContext();

  const pathname = usePathname();
  const router = useRouter();

  const selectedKeys = useMemo(() => {
    const pathKey = getPathKey(pathname);
    if (pathKey) {
      if (!pathKey?.length || pathKey === "home") return ["/"];
      return [`/${pathKey}`];
    }
    return [pathname];
  }, [pathname]);

  const onMenuClick: MenuProps["onClick"] = (e) => router.push(e.key);

  return (
    <Menu
      onClick={onMenuClick}
      className="border-r-0"
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      items={menuItems}
      style={{ background: backgroundColor }}
    />
  );
};
