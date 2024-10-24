"use client";

import { useAdminNavigationItems } from "@/hooks/useAdminNavigationItems";
import { Role } from "@prisma/client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  role: Role;
};

export const HomeNavigation = ({ role }: Props) => {
  const router = useRouter();
  const menuItems = useAdminNavigationItems({ role, skipHome: true });

  return (
    <div className="flex max-w-80 flex-wrap justify-center gap-x-2 gap-y-4">
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
