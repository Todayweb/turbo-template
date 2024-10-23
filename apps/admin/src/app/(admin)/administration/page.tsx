import { prisma } from "@repo/db";
import { AddUserModal } from "./components/AddUserModal";
import { UserActionBar } from "./components/UserActionBar";
import { UsersTable } from "./components/UsersTable";
import { AdministrationProvider } from "./providers/AdministrationProvider";

export default async function Administration() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return (
    <AdministrationProvider data={users}>
      <UserActionBar />
      <AddUserModal />
      <UsersTable />
    </AdministrationProvider>
  );
}
