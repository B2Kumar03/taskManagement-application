import express from "express"
import { login, register } from "./controller/user.controler.js"
import userRouter from "./route/user.route.js"

const app=express()
app.use(express.json())


app.use("/api/v1/users",userRouter)



export {app}