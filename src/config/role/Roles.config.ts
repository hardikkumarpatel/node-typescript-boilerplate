import { IRole } from "@/helpers/role/Role.definations";

export const ROLES: ReadonlyArray<IRole> = Object.freeze([
  {
    name: "SUPER_ADMIN",
    permissions: ["create", "read", "update", "delete"]
  },
  {
    name: "ADMIN",
    permissions: ["create", "read", "update"]
  },
  {
    name: "EMPLOYEE",
    permissions: ["read"]
  },
  {
    name: "ANONYMOUES",
    permissions: ["read"]
  }
] as const);
