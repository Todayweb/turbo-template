"use client";

import type { User } from "@prisma/client";
import { Divider, Drawer } from "antd";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { useSettingsDrawerContext } from "./SettingsDrawerProvider";
import { SignOut } from "./SignOut";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface SettingsDrawerProps {
  user: User | null;
}

export const SettingsDrawer = ({ user }: SettingsDrawerProps) => {
  const t = useTranslations("Settings");
  const { open, setOpen } = useSettingsDrawerContext();

  return (
    <Drawer
      title={user?.email || t("label")}
      onClose={() => setOpen(false)}
      open={open}
      closable={false}
      extra={user && <SignOut />}
    >
      <div>
        <LocaleSwitcher />
        <Divider />
        <ThemeSwitcher />
      </div>
    </Drawer>
  );
};
