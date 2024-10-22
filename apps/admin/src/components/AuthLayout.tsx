"use client";

import { Layout } from "antd";
import React, { type PropsWithChildren } from "react";
import { Logo } from "./Logo";
import { Settings } from "./Settings";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <header className="fixed left-0 top-0 flex w-full items-center justify-between px-6 py-4">
        <Logo />
        <div>
          <Settings />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col justify-center h-screen md:items-center">
        {children}
      </main>
    </Layout>
  );
};
