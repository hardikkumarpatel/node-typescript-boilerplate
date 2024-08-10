import { ROLES } from "@/config/role/Roles.config";
import { IRole } from "@/helpers/role/Role.definations";

class RoleHelper {
  private roles: ReadonlyArray<IRole>;
  constructor() {
    this.roles = ROLES;
  }

  public async getRoleByName(name: string): Promise<IRole> {
    return this.roles.find((role) => role.name === name) as IRole;
  }

  public async getRoles(): Promise<IRole[]> {
    return this.roles as IRole[];
  }
}

export default RoleHelper;
