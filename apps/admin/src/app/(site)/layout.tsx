import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getCurrentSession();
  if (!session) redirect(routes.signIn);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
