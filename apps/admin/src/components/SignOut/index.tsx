"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import { signOutAction } from "./sign-out-action";

export const SignOut = () => {
  const t = useTranslations("Navigation");
  const [_, formAction] = useFormState(signOutAction, null);

  return (
    <form action={formAction} className="w-full">
      <Button htmlType="submit" icon={<LogoutOutlined />} block>
        {t("signOut")}
      </Button>
    </form>
  );
};
