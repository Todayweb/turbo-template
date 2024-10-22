import { routes } from "@/config/routes";
import { HomeOutlined, SafetyOutlined } from "@ant-design/icons";
import { Role } from "@prisma/client";
import { useTranslations } from "next-intl";

type Props = {
  role: Role;
  skipHome?: boolean;
};

type NavRoutes = Pick<typeof routes, "home" | "administration">;

const routePermissions: Record<keyof NavRoutes, Role[]> = {
  home: [],
  administration: [Role.admin],
};

const items: { key: string; route: keyof NavRoutes; icon: JSX.Element }[] = [
  { key: routes.home, route: "home", icon: <HomeOutlined /> },
  { key: routes.administration, route: "administration", icon: <SafetyOutlined /> },
];

export const useNavItems = ({ role, skipHome }: Props) => {
  const t = useTranslations("Navigation");

  const navItems = items.map(({ route, ...rest }) => ({
    label: t(route),
    path: routes[route],
    permissions: routePermissions[route],
    ...rest,
  }));

  return navItems.filter(({ path, permissions }) => {
    if (skipHome && path === routes.home) return false;
    if (role === "admin" || permissions.length === 0) return true;
    return permissions.includes(role);
  });
};
