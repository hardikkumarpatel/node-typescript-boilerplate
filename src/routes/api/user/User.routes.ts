import { Router } from "express";
import { UserController } from "@/api/rest";
import { ApiAuthHelperMiddleware, ApiRoleHelperMiddleware } from "@/middleware";
import { Permissions } from "@/helpers/role/Role.definations";
const UserRoutes = Router();

UserRoutes.use(ApiAuthHelperMiddleware.use);
UserRoutes.route("/create").get(
  ApiRoleHelperMiddleware.role(Permissions.READ),
  UserController.getUsers
);
export default UserRoutes;
