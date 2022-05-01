import {Router} from "express";
import {join,edit,remove} from "../controllers/userController"

const usersRouter = Router();


usersRouter.get("/edit", edit);
usersRouter.get("/remove", remove);

export default usersRouter