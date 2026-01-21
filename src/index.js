import connectDB from "./db/index.js"
import { asyncHandler } from "./utils/asyncHandler.js"
import { app } from "./app.js"
import "dotenv/config"

const port = process.env.PORT || 3000

asyncHandler(await connectDB()
.then(() => {
    app.listen(port, (res,req)=>{})
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
}))

console.log("Success")

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