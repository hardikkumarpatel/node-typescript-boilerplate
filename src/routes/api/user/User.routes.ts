import { Router } from "express";
import { UserController } from "@/api";
const UserRoutes = Router();

// UserRoutes.use(ApiAuthHelperMiddleware.useAuthMiddleware);
UserRoutes.route("/create").get(UserController.getUsers);
export default UserRoutes;
