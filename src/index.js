// import mongoose from "mongoose"
// import dotenv from "dotenv/config"
// import express from "express";

// const app = express();
// port= process.env.PORT || 3000

import connectDB from "./db/index.js"

connectDB()



// ;(async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGO_URL}/db`)
//        app.on("error",(err)=>{
//             console.log(err)
//             throw err})
//         app.listen(port,()=> console.log(`listening on port ${port}`))
//     }
//     catch(err){
//         console.log(err)
//         throw err
//     }

// })()