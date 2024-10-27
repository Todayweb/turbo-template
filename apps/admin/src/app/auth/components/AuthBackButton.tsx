import { routes } from "@/config/routes";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const AuthBackButton = ({ children }: PropsWithChildren) => {
  return (
    <Link href={routes.signIn}>
      <Button type="link" icon={<LeftOutlined />}>
        {children}
      </Button>
    </Link>
  );
};
