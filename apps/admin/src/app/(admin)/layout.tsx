import { AppLayout } from "@/components/AppLayout";
import { routes } from "@/config/routes";
import { PermissionProvider } from "@/providers/PermissionProvider";
import { getCurrentSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect(routes.signIn);

  return (
    <PermissionProvider role={user.role}>
      <AppLayout role={user.role}>{children}</AppLayout>
    </PermissionProvider>
  );
}
