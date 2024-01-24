import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>
{
    try {
        const conectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`host ${conectionInstance.connection.host}`)
        
    } catch (error) {
        console.error("database connection error",error)
       
    }
}
export default connectDB