import { HomeOutlined, SafetyOutlined } from "@ant-design/icons";
import { Role } from "@prisma/client";

export const authRoutes = {
  signIn: "/auth/sign-in",
  resetPassword: "/auth/reset-password",
  resetPasswordCallback: "/auth/reset-password/callback",
} as const;

export const adminRoutes = {
  home: "/",
  administration: "/administration",
};

export const routes = { ...authRoutes, ...adminRoutes };

export type AdminRoute = keyof typeof adminRoutes;

export const adminRoutesPermissions: Record<AdminRoute, Role[]> = {
  home: [],
  administration: [Role.admin],
};

export const adminNavigationItems: {
  route: AdminRoute;
  icon: JSX.Element;
}[] = [
  {
    route: "home",
    icon: <HomeOutlined />,
  },
  {
    route: "administration",
    icon: <SafetyOutlined />,
  },
];
