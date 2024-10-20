import { prisma } from "@repo/db";
import { Button } from "antd";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <div>Users: {JSON.stringify(users)}</div>
      <div>Env: {process.env.NEXT_PUBLIC_TEST}</div>
      <Button>Jellou</Button>
    </div>
  );
}
