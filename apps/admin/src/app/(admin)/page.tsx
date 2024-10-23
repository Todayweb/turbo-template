import { Logo } from "@/components/Logo";

import { getCurrentSession } from "@/utils/auth";
import { HomeNavigation } from "./components/HomeNavigation";

export default async function Home() {
  const { user } = await getCurrentSession();

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <Logo size="large" />
      <HomeNavigation role={user?.role} />
    </div>
  );
}
