"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import { signOutAction } from "./signOutAction";

type Props = {
  iconOnly?: boolean;
};

export const SignOut = ({ iconOnly }: Props) => {
  const t = useTranslations("Navigation");
  const [_, formAction] = useFormState(signOutAction, null);

  return (
    <form action={formAction} className="w-full">
      <Button htmlType="submit" icon={<LogoutOutlined />} block>
        {!iconOnly && t("signOut")}
      </Button>
    </form>
  );
};
