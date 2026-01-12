import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,                  //which frontent can access this backend
    }
))
app.use(express.json(
    {
        limit: "32kb"
    }
))
app.use(express.urlencoded(
    {
        limit: "32kb"
    }
))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)

export {app}



// import connectDB from "./db/index.js"

// const app = express();
// port= process.env.PORT || 3000


// connectDB()
// .then(
//     app.listen(port,(req,res)=> console.log(`listening on ${port}`))
// )

// .catch((err)=> console.log("Db connect error",err))

// export default {app}