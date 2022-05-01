import { Router } from "express";
import * as controller from "../controllers/globalController"

const globalRouter = Router();



globalRouter.get("/", controller.home);
globalRouter.get("/join", controller.join);

export default globalRouter