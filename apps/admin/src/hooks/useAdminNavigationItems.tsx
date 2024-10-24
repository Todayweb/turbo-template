import { adminNavigationItems, routes } from "@/config/routes";
import { userHasPermissions } from "@/utils/userHasPermissions";
import type { Role } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Props = {
  role: Role;
  skipHome?: boolean;
};

export const useAdminNavigationItems = ({ role, skipHome }: Props) => {
  const t = useTranslations("Navigation");

  const items = adminNavigationItems.map(({ route, ...rest }) => ({
    key: routes[route],
    label: t(route),
    ...rest,
  }));

  return useMemo(
    () =>
      items.filter(({ key, permissions }) => {
        if (skipHome && key === routes.home) return false;
        return userHasPermissions({ permissions, role });
      }),
    [role],
  );
};
