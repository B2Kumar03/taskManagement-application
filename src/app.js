import express from "express"
import { login, register } from "./controller/user.controler.js"
import userRouter from "./route/user.route.js"
import todo_route from "./route/todo.route.js"
import cors from "cors"


const app=express()
app.use(cors())
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/users",userRouter)



app.use("/api/v1/users",todo_route)


export {app}