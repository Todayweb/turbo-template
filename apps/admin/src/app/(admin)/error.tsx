"use client";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminPageError({ error, reset }: Props) {
  const t = useTranslations("Error");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Result
      title={t("message")}
      icon={<ExclamationCircleOutlined className="!text-error" />}
      extra={
        <Button type="primary" onClick={() => reset()}>
          {t("button")}
        </Button>
      }
    />
  );
}
