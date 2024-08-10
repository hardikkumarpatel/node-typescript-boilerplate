export interface IRole {
  name: string;
  permissions: ReadonlyArray<string>;
}

export enum Permissions {
  CREATE = "create",
  UPDATE = "update",
  READ = "read",
  DELETE = "delete"
}
