"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider, ThemeConfig, theme as antdTheme } from "antd";
import enUS from "antd/locale/en_US";
import sk_SK from "antd/locale/sk_SK";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

export const AntdConfigProvider = ({ children }: PropsWithChildren) => {
  const [rendered, setRendered] = useState(false);
  const { resolvedTheme } = useTheme();
  const locale = useLocale();

  useEffect(() => {
    setRendered(true);
  }, [resolvedTheme]);

  const configTheme: ThemeConfig = useMemo(
    () => ({
      algorithm: resolvedTheme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        fontFamily: "inherit",
        colorPrimary: "#64A0FA",
        fontSizeLG: 14,
      },
      components: {
        Form: {
          itemMarginBottom: 18,
        },
      },
    }),
    [resolvedTheme],
  );

  if (!rendered) return null;

  return (
    <ConfigProvider
      locale={locale === "sk" ? sk_SK : enUS}
      theme={configTheme}
      componentSize="large"
    >
      <StyleProvider layer>
        <App>{children}</App>
      </StyleProvider>
    </ConfigProvider>
  );
};
