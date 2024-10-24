import { getEnsuredSession } from "@/utils/auth";
import { prisma } from "@repo/db";
import { AddUserModal } from "./components/AddUserModal";
import { DeleteUserModal } from "./components/DeleteUserModal";
import { UpdateUserModal } from "./components/UpdateUserModal";
import { UserActionBar } from "./components/UserActionBar";
import { UsersTable } from "./components/UsersTable";
import { AdministrationProvider } from "./providers/AdministrationProvider";

export default async function Administration() {
  const { user } = await getEnsuredSession();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return (
    <AdministrationProvider data={users} userId={user.id}>
      <UserActionBar />
      <AddUserModal />
      <UpdateUserModal />
      <DeleteUserModal />
      <UsersTable />
    </AdministrationProvider>
  );
}
