import { ROLES } from "@/config/role/Roles.config";
import { IRole } from "./Role.definations";

class PermissionsHelper {
  private roles: ReadonlyArray<IRole>;
  constructor() {
    this.roles = ROLES;
  }

  public async getPermissionsByRoleName(name: string): Promise<ReadonlyArray<string>> {
    const role = this.roles.find((role) => role.name === name);
    return role ? role.permissions : [];
  }
}

export default PermissionsHelper;
