import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app=express();

// configure cors cross origin resourse 
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
// configure express
// 1) configure to get data in form of json file
app.use(express.json({limit: "16kb"}))
// 2) configure toget data from url
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// 3) configure to store some static data like images etc
app.use(express.static("public"))

app.use(cookieParser())

export default app;