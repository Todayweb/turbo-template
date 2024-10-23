"use client";

import { Layout, theme } from "antd";
import React, { type PropsWithChildren } from "react";

const { Content } = Layout;

export const AppContent = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content className="m-4 flex flex-col">
      <div className="p-6 rounded-md flex-grow" style={{ background: colorBgContainer }}>
        {children}
      </div>
    </Content>
  );
};
