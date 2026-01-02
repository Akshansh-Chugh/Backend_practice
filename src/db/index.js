import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import express from "express"
import "dotenv/config";

const app = express()
const port = process.env.PORT || 3000
const connectDB = async () => {

    try
    {
        const connection =await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(connection.connection.host)
        app.listen(port,(req,res)=>
        {
            console.log(`running on port ${port}`)
        })
    }

    catch(error)
    {
        console.log(error)
        process.exit(1)
    
    }
}

export default connectDB