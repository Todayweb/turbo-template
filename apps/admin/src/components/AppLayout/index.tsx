"use client";

import { useAdminNavigationItems } from "@/hooks/useAdminNavigationItems";
import { Role } from "@prisma/client";
import { Layout, MenuProps, theme } from "antd";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { AppContent } from "./components/AppContent";
import { AppHeader } from "./components/AppHeader";
import { AppSider } from "./components/AppSider";

type AppLayoutProviderProps = {
  children: ReactNode;
  role: Role;
};

type AppLayoutContextProps = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  menuItems: MenuProps["items"];
  backgroundColor: string;
};

const AppLayoutContext = createContext<AppLayoutContextProps | null>(null);

export const AppLayout = ({ children, role }: AppLayoutProviderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = useAdminNavigationItems({ role });

  const {
    token: { colorBgContainer: backgroundColor },
  } = theme.useToken();

  return (
    <AppLayoutContext.Provider value={{ collapsed, setCollapsed, menuItems, backgroundColor }}>
      <Layout hasSider>
        <AppSider />
        <Layout>
          <AppHeader />
          <AppContent>{children}</AppContent>
        </Layout>
      </Layout>
    </AppLayoutContext.Provider>
  );
};

export const useAppLayoutContext = () => {
  const context = useContext(AppLayoutContext);
  if (!context) {
    throw new Error("useAppLayoutContext must be used within a AppLayout");
  }
  return context;
};
