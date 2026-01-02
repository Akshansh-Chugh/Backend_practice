import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import express from "express";

const app = express();
port= process.env.PORT || 3000

;(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGO_URL}/db`)
       app.on("error",(err)=>{
            console.log(err)
            throw err})
        app.listen(port,()=> console.log(`listening on port ${port}`))
    }
    catch(err){
        console.log(err)
        throw err
    }

})()