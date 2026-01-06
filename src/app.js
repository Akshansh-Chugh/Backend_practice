import express from "express";
import connectDB from "./db/index.js"

const app = express();
port= process.env.PORT || 3000


connectDB()
.then(
    app.listen(port,(req,res)=> console.log(`listening on ${port}`))
)

.catch((err)=> console.log("Db connect error",err))

export default {app}