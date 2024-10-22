import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getCurrentSession();
  if (session) redirect(routes.home);

  return (
    <main className="mx-auto my-2 flex w-full max-w-md flex-col justify-center md:h-[calc(100vh-72px)] md:items-center">
      {children}
    </main>
  );
}
