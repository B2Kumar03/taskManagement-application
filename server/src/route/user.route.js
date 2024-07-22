import { Router } from "express";
import { login, register } from "../controller/user.controler.js";
import {authAccess} from "../middleware/authAccess.middleware.js"

const userRouter = Router();

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)

export default userRouter;
