import { Button, Flex, Result } from "antd";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("title")}
      extra={
        <Flex justify="center" gap="small">
          <Button type="primary">{t("back")}</Button>
          <Button type="primary">{t("backHome")}</Button>
        </Flex>
      }
    />
  );
}
