import express from "express"
import { login, register } from "./controller/user.controler.js"
import userRouter from "./route/user.route.js"
import todo_route from "./route/todo.route.js"


const app=express()
app.use(express.json())


app.use("/api/v1/users",userRouter)



app.use("/api/v1/users",todo_route)


export {app}