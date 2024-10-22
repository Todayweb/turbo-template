import { AppLayout } from "@/components/AppLayout";
import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect(routes.signIn);

  return <AppLayout role={user.role}>{children}</AppLayout>;
}
