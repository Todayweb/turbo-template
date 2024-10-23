import { HomeOutlined, SafetyOutlined } from "@ant-design/icons";
import type { Role } from "@prisma/client";

export const routes = {
  home: "/",
  administration: "/administration",
  signIn: "/auth/sign-in",
  resetPassword: "/auth/reset-password",
  resetPasswordCallback: "/auth/reset-password/callback",
} as const;

type NavigationRoute = keyof Pick<typeof routes, "home" | "administration">;

export const navigationRoutes: {
  route: NavigationRoute;
  permissions: Role[];
  icon: JSX.Element;
}[] = [
  {
    route: "home",
    icon: <HomeOutlined />,
    permissions: [],
  },
  {
    route: "administration",
    icon: <SafetyOutlined />,
    permissions: ["admin"],
  },
];
