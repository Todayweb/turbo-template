"use client";

import type { Theme } from "@/types/theme";
import { MoonOutlined, SettingOutlined, SunOutlined } from "@ant-design/icons";
import { Flex, Radio, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const t = useTranslations("Settings");
  const { setTheme, themes, theme: currentTheme } = useTheme();

  return (
    <div className="flex flex-col gap-1">
      <Typography.Text strong>{t("label")}</Typography.Text>

      <Radio.Group defaultValue={currentTheme} buttonStyle="solid">
        {themes.map((theme) => {
          let icon = <SunOutlined className="mr-2 h-4 w-4" />;
          if (theme === "dark") icon = <MoonOutlined className="mr-2 h-4 w-4" />;
          if (theme === "system") icon = <SettingOutlined className="mr-2 h-4 w-4" />;

          return (
            <Radio.Button key={theme} value={theme} onClick={() => setTheme(theme)}>
              <Flex align="center">
                {icon}
                <p>{t(`theme.${theme as Theme}`)}</p>
              </Flex>
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
};
