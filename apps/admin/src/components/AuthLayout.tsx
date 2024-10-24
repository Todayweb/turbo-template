"use client";

import { Layout } from "antd";
import React, { type PropsWithChildren } from "react";
import { Logo } from "./Logo";
import { Settings } from "./Settings";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <header className="fixed top-0 left-0 flex w-full items-center justify-between px-6 py-4">
        <Logo />
        <div>
          <Settings triggerIconOnly />
        </div>
      </header>

      <main className="mx-auto flex h-screen w-full max-w-md flex-col justify-center md:items-center">
        {children}
      </main>
    </Layout>
  );
};
