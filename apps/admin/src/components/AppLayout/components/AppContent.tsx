"use client";

import { Layout, theme } from "antd";
import React, { type PropsWithChildren } from "react";

const { Content } = Layout;

export const AppContent = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content className="my-6 mx-4">
      <div className="p-6 rounded-md" style={{ background: colorBgContainer }}>
        {children}
      </div>
    </Content>
  );
};
