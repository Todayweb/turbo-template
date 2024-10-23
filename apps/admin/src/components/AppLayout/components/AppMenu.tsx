"use client";

import { Menu, type MenuProps, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  menuItems: MenuProps["items"];
};

export const AppMenu = ({ menuItems }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKeys = React.useMemo(() => {
    if (pathname.includes("/") && pathname.length > 1) {
      const pathKey = pathname.split("/")[1];
      if (pathKey) return [`/${pathKey}`];
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
      items={menuItems}
      style={{ background: colorBgContainer }}
    />
  );
};
