import { AuthLayout } from "@/components/AuthLayout";
import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { session } = await getCurrentSession();
  if (session) redirect(routes.home);

  return <AuthLayout>{children}</AuthLayout>;
}
