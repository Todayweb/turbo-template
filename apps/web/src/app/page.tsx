import { cn } from "@/utils/cn";
import { prisma } from "@repo/db";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className={cn("bg-red-500")}>
      <div>Users: {JSON.stringify(users)}</div>
      <div>Env: {process.env.NEXT_PUBLIC_TEST}</div>
    </div>
  );
}
