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
    <Flex vertical gap="small">
      <Typography.Text strong>{t("theme.label")}</Typography.Text>

      <Radio.Group defaultValue={currentTheme} buttonStyle="solid">
        {themes.map((theme) => {
          const iconClassName = "mr-2 h-4 w-4";

          let icon = <SunOutlined className={iconClassName} />;
          if (theme === "dark") icon = <MoonOutlined className={iconClassName} />;
          if (theme === "system") icon = <SettingOutlined className={iconClassName} />;

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
    </Flex>
  );
};
