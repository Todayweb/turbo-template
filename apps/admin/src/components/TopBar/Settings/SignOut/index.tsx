"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import { signOutAction } from "./signOutAction";

export const SignOut = () => {
  const t = useTranslations("Settings");
  const [_, formAction] = useFormState(signOutAction, null);

  return (
    <form action={formAction}>
      <Button size="middle" className="w-full" htmlType="submit" icon={<LogoutOutlined />}>
        {t("signOut")}
      </Button>
    </form>
  );
};
