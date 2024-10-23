import UsersTable from "@/components/UsersTable";
import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { prisma } from "@repo/db";
import { redirect } from "next/navigation";

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

  const dataSource = users.map((user) => ({
    key: user.id,
    email: user.email,
    role: user.role,
  }));

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return <UsersTable dataSource={dataSource} columns={columns} />;
}
