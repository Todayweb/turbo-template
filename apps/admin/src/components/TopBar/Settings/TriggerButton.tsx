"use client";

import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useSettingsDrawerContext } from "./SettingsDrawerProvider";

export const TriggerButton = () => {
  const { setOpen } = useSettingsDrawerContext();

  return <Button type="dashed" icon={<SettingOutlined />} onClick={() => setOpen(true)} />;
};
