import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import RouterBook from "./Router/RouterBook.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(RouterBook)

app.listen(process.env.PORT, ()=>{
    console.log(`your app is already running on port:${process.env.PORT}`)
})
