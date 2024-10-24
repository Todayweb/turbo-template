"use client";

import { Layout, theme } from "antd";
import React, { type PropsWithChildren } from "react";
import { useAppLayoutContext } from "..";

const { Content } = Layout;

export const AppContent = ({ children }: PropsWithChildren) => {
  const { backgroundColor } = useAppLayoutContext();

  return (
    <Content className="m-4 flex flex-col">
      <div className="flex-grow rounded-md p-6" style={{ background: backgroundColor }}>
        {children}
      </div>
    </Content>
  );
};
