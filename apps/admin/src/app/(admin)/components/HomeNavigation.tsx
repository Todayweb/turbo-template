"use client";

import { useAdminNavigationItems } from "@/hooks/useAdminNavigationItems";
import type { Role } from "@prisma/client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  role: Role;
};

export const HomeNavigation = ({ role }: Props) => {
  const router = useRouter();
  const menuItems = useAdminNavigationItems({ role, skipHome: true });

  return (
    <div className="flex justify-center gap-x-2 gap-y-4 flex-wrap max-w-80">
      {menuItems.map(({ key, icon, label }) => (
        <Button
          onClick={() => router.push(key)}
          color="default"
          variant="outlined"
          key={key}
          icon={icon}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
