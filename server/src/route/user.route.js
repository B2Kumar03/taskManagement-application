import { Router } from "express";
import { getUser, login, register, updateAvatar, uploadAvtar } from "../controller/user.controler.js";
import {authAccess} from "../middleware/authAccess.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/get-user").get(authAccess,getUser)
userRouter.route("/upload-avtar").post(upload.single("url"),uploadAvtar)
userRouter.route("/update-avtar").post(upload.single("url"),updateAvatar)

export default userRouter;
