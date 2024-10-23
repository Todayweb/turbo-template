import type { Role } from "@prisma/client";

type Params = {
  permissions: Role[];
  role: Role;
};

export const userHasPermissions = ({ permissions, role }: Params) =>
  role === "admin" || !permissions.length || permissions.includes(role);
