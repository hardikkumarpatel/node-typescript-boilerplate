import { Router } from "express";
import Apiroutes from "@/routes/api";
const routes = Router();

routes.use("/api/v1", Apiroutes);
export default routes;
