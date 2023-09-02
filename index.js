import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import RouterBook from "./Router/RouterBook.js"
import bodyParser from "body-parser";
dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))
app.use(RouterBook)



app.listen(process.env.PORT, ()=>{
    console.log(`your app is already running on port:${process.env.PORT}`)
})
