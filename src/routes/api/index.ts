import { Router } from "express";
import Userroutes from "@/routes/api/user/User.routes";
const routes = Router();

routes.use("/user", Userroutes);
export default routes;
