import { Router } from "express";
import { todoCreater } from "../controller/todo.controller.js";
import { authAccess } from "../middleware/authAccess.middleware.js";

 const todo_route = Router();

todo_route.route("/create-task").post(authAccess,todoCreater);


export default todo_route

