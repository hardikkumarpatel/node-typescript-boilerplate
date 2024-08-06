import { Router } from "express";
import { UserController } from "@/api/rest";
import { ApiAuthHelperMiddleware } from "@/middleware";
const UserRoutes = Router();

UserRoutes.use(ApiAuthHelperMiddleware.use);
UserRoutes.route("/create").get(UserController.getUsers);
export default UserRoutes;
