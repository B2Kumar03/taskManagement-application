import { Router } from "express";
import {
    filterTodosByStatus,
  getAllTodosForUser,
  todoCreater,
  todoDeleter,
  todoUpdater,
} from "../controller/todo.controller.js";
import { authAccess } from "../middleware/authAccess.middleware.js";

const todo_route = Router();

todo_route.route("/create-task").post(authAccess, todoCreater);
todo_route.route("/update-todos/:id").patch(todoUpdater);
todo_route.route("/delete-todo/:id").delete(todoDeleter);
todo_route.route("/todo").get(filterTodosByStatus)
todo_route.route("/getTodo").get(authAccess,getAllTodosForUser)

export default todo_route;
