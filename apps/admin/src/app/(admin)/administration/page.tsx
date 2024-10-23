import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { prisma } from "@repo/db";
import { redirect } from "next/navigation";
import UsersTable from "./components/UsersTable";
import { AdministrationProvider } from "./providers/AdministrationProvider";

export default async function Administration() {
  const { user } = await getCurrentSession();
  if (!user || user.role !== "admin") redirect(routes.home);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return (
    <AdministrationProvider data={users}>
      <UsersTable />
    </AdministrationProvider>
  );
}
