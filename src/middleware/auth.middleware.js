import { apiError } from "../utils/apiErrors.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt  from "jsonwebtoken"
// import dotenv from "dotenv"
import { User } from "../models/user.models.js"



const Jwt= asyncHandler(async(req,res,next)=>
{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if (!token) throw new apiError(401,"Unauthorized")
    
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_KEY)
    
        if (!decodedToken) throw new apiError(407,`Invalid token ${token}`)
    
       const user= await User.findById(decodedToken._id).select("-password -refreshtoken")
    
        if (!user) throw new apiError(401, "Invalid Access token")
    
        req.user=user
        next()
    } catch (error) {
        throw new apiError(401,error.message ||"Invalid access token (caught in auth middleware)")
        
    }
})

export default Jwt