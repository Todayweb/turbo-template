import { HomeOutlined, SafetyOutlined } from "@ant-design/icons";
import { Role } from "@prisma/client";

export const routes = {
  home: "/",
  administration: "/administration",
  signIn: "/auth/sign-in",
  resetPassword: "/auth/reset-password",
  resetPasswordCallback: "/auth/reset-password/callback",
} as const;

export const adminRoutes: Array<keyof Pick<typeof routes, "home" | "administration">> = [
  "home",
  "administration",
] as const;

export type AdminRoute = (typeof adminRoutes)[number];

export const adminRoutesPermissions: Record<AdminRoute, Role[]> = {
  home: [],
  administration: [Role.admin],
};

export const adminNavigationItems: {
  route: AdminRoute;
  permissions: Role[];
  icon: JSX.Element;
}[] = [
  {
    route: "home",
    icon: <HomeOutlined />,
    permissions: adminRoutesPermissions.home,
  },
  {
    route: "administration",
    icon: <SafetyOutlined />,
    permissions: adminRoutesPermissions.administration,
  },
];
