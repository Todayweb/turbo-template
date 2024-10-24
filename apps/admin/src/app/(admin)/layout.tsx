import { AppLayout } from "@/components/AppLayout";
import { PermissionProvider } from "@/providers/PermissionProvider";
import { getEnsuredSession } from "@/utils/auth";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { user } = await getEnsuredSession();

  return (
    <PermissionProvider role={user.role}>
      <AppLayout role={user.role}>{children}</AppLayout>
    </PermissionProvider>
  );
}
