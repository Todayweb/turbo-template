"use client";

import { Divider, Drawer } from "antd";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { useSettingsDrawerContext } from "./SettingsDrawerProvider";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const SettingsDrawer = () => {
  const t = useTranslations("Settings");
  const { open, setOpen } = useSettingsDrawerContext();

  return (
    <Drawer title={t("label")} onClose={() => setOpen(false)} open={open}>
      <div>
        <LocaleSwitcher />
        <Divider />
        <ThemeSwitcher />
      </div>
    </Drawer>
  );
};
