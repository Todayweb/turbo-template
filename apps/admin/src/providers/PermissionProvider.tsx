"use client";

import { AdminRoute, adminRoutes, adminRoutesPermissions } from "@/config/routes";
import { getPathKey } from "@/utils/getPathKey";
import { userHasPermissions } from "@/utils/userHasPermissions";
import { Role } from "@prisma/client";
import { notFound, usePathname } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

type PermissionProviderProps = {
  children: ReactNode;
  role: Role;
};

export const PermissionContext = createContext(null);

export const PermissionProvider = ({ children, role }: PermissionProviderProps) => {
  const pathName = usePathname();
  const pathKey = getPathKey(pathName) as AdminRoute;

  if (role === "noAccess") notFound();
  if (!adminRoutes[pathKey]) notFound();
  if (!userHasPermissions({ permissions: adminRoutesPermissions[pathKey], role })) notFound();

  return <PermissionContext.Provider value={null}>{children}</PermissionContext.Provider>;
};

export const usePermissionContext = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissionContext must be used within a Permission");
  }
  return context;
};
