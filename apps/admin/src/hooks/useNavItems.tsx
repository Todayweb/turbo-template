import { navigationRoutes, routes } from "@/config/routes";
import type { Role } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  role?: Role;
  skipHome?: boolean;
};

export const useNavItems = ({ role, skipHome }: Props) => {
  const t = useTranslations("Navigation");

  const navItems = navigationRoutes.map(({ route, ...rest }) => ({
    key: routes[route],
    label: t(route),
    ...rest,
  }));

  if (!role) return [];

  return navItems.filter(({ key, permissions }) => {
    if (skipHome && key === routes.home) return false;
    if (role === "admin" || permissions.length === 0) return true;
    return permissions.includes(role);
  });
};
