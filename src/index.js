import dotenv from "dotenv";
import connectDB from "./db/index.js"
import app from "./app.js";

dotenv.config(
    {
        path:'./env'
    }
)

// database connection and promise handling
connectDB()
.then(()=>
{
    app.listen(process.env.PORT || 8000 ,()=>
    {
        console.log(`port listen on ${process.env.PORT}`);
    })
})
.catch((err)=>
    {
        console.log("database connection error",err);
    })