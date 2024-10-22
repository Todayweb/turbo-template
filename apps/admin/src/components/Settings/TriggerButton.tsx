"use client";

import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import type { SettingsProps } from ".";
import { useSettingsDrawerContext } from "./SettingsDrawerProvider";

export const TriggerButton = ({ iconOnly }: SettingsProps) => {
  const t = useTranslations("Settings");
  const { setOpen } = useSettingsDrawerContext();

  return (
    <Button icon={<SettingOutlined />} onClick={() => setOpen(true)} block>
      {!iconOnly && t("label")}
    </Button>
  );
};
