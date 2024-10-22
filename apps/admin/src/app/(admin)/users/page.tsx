import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { prisma } from "@repo/db";
import { redirect } from "next/navigation";

export default async function Users() {
  const { user } = await getCurrentSession();
  if (!user || user.role !== "admin") redirect(routes.home);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return <div>{JSON.stringify(users)}</div>;
}
