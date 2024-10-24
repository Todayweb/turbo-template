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
      <div className="flex-grow rounded-md p-6" style={{ background: colorBgContainer }}>
        {children}
      </div>
    </Content>
  );
};
