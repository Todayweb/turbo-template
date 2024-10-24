"use client";

import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { useSettingsDrawerContext } from "../providers/SettingsDrawerProvider";

export const TriggerButton = () => {
  const t = useTranslations("Settings");
  const { setOpen, triggerIconOnly } = useSettingsDrawerContext();

  return (
    <Button icon={<SettingOutlined />} onClick={() => setOpen(true)} block={!triggerIconOnly}>
      {!triggerIconOnly && t("label")}
    </Button>
  );
};
