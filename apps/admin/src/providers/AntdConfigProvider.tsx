"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider, theme as antdTheme } from "antd";
import type { ThemeConfig } from "antd";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export const AntdConfigProvider = ({ children }: React.PropsWithChildren) => {
  const [rendered, setRendered] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setRendered(true);
  }, [resolvedTheme]);

  const configTheme: ThemeConfig = useMemo(
    () => ({
      algorithm: resolvedTheme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        fontFamily: "inherit",
        colorPrimary: "#b09561",
        colorInfo: "#b09561",
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
    <ConfigProvider theme={configTheme} componentSize="large">
      <StyleProvider layer>
        <App>{children}</App>
      </StyleProvider>
    </ConfigProvider>
  );
};
