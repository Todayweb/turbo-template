"use client";

import { useNavItems } from "@/hooks/useNavItems";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { Role } from "@prisma/client";
import { Button, Layout, Menu, type MenuProps, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, type PropsWithChildren } from "react";
import { Logo } from "./Logo";
import { Settings } from "./Settings";
import { SignOut } from "./SignOut";

type Props = {
  role: Role;
};

const { Header, Content, Sider } = Layout;

export const AppLayout = ({ children, role }: PropsWithChildren<Props>) => {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navItems = useNavItems({ role });

  const selectedKeys = React.useMemo(() => {
    if (pathname.includes("/") && pathname.length > 1) {
      const pathKey = pathname.split("/")[1];
      if (pathKey) return [`/${pathKey}`];
    }
    return [pathname];
  }, [pathname]);

  const onMenuClick: MenuProps["onClick"] = (e) => router.push(e.key);

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
              onClick={onMenuClick}
              className="border-r-0"
              mode="inline"
              defaultSelectedKeys={selectedKeys}
              items={navItems}
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
