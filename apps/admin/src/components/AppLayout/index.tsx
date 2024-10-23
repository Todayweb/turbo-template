"use client";

import { useNavItems } from "@/hooks/useNavItems";
import type { Role } from "@prisma/client";
import { Layout, type MenuProps, theme } from "antd";
import { type Dispatch, type SetStateAction, createContext, useContext, useState } from "react";
import { AppContent } from "./components/AppContent";
import { AppHeader } from "./components/AppHeader";
import { AppSider } from "./components/AppSider";

interface AppLayoutProviderProps {
  children: React.ReactNode;
  role: Role;
}

interface AppLayoutContextProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  menuItems: MenuProps["items"];
  backgroundColor: string;
}

export const AppLayoutContext = createContext({} as AppLayoutContextProps);

export const AppLayout = ({ children, role }: AppLayoutProviderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = useNavItems({ role });

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
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
