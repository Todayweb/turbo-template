"use client";

import { Role } from "@prisma/client";
import { useTranslations } from "next-intl";

export const useRoleOptions = () => {
  const t = useTranslations("Administration");
  const roles: Role[] = ["admin", "editor", "noAccess"];
  return roles.map((role) => ({ value: role, label: t(`roleOptions.${role}`) }));
};
