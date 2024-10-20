import LocaleSwitcher from "@/components/LocaleSwitcher";
import { prisma } from "@repo/db";
import { Button } from "antd";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const users = await prisma.user.findMany();
  const t = await getTranslations("HomePage");

  return (
    <div>
      <div>Users: {JSON.stringify(users)}</div>
      <div>Env: {process.env.NEXT_PUBLIC_TEST}</div>
      <Button>{t("title")}</Button>
      <LocaleSwitcher />
    </div>
  );
}
