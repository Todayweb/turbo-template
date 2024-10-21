import { routes } from "@/config/routes";
import { Button, Flex, Result } from "antd";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("title")}
      extra={
        <Flex justify="center">
          <Link href={routes.home}>
            <Button type="primary">{t("backHome")}</Button>
          </Link>
        </Flex>
      }
    />
  );
}
