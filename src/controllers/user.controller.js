import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import { apiError } from "../utils/apiErrors.js"
import { toCloud } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"


const registerUser= asyncHandler(async (req,res)=>
{
    //input creds
    //trim and validate
    //Check if exsists
    //check avatar
    //upload to cloudinary
    //create user obj
    // check if created
    //return
    var {fullName,username,email,password}=req.body
    console.log(req.body)
    
    username = username.toLowerCase().trim()
    email = email.toLowerCase().trim();

    if (!username || !email || !password || !fullName) throw new apiError(400,"All fields are required")


    if (!User.findOne({
        $or: [ { username }, { email } ]
    }))
        throw apiError(statuscode=411,message="Already exists")
    
    const avatar_l=req.files?.avatar[0]?.path
    const profilePic_l=req.files?.profilePic[0]?.path

    if (!avatar_l) throw new apiError(400,"Avatar is required")

    const avatar_c=await toCloud(avatar_l)
    const profile_c=await toCloud(profilePic_l)
    
    if (!avatar_c) throw new apiError(400,"Avatar is required")
    
    const user= await User.create(
        {
            fullName:fullName,
            username:username.toLowerCase(),
            email:email,
            password:password,
            avatar:avatar_c.secure_url,
            profilePic:profile_c?.secure_url ||""
        }
    )

    const created= await User.findById(user._id).select("-password -refreshtoken")

    if (!created) throw new apiError(500,"Something went wrong , user not created")


    return res.status(200).json(
            new apiResponse(200 , created, "user registered successfully")
        )
})
console.log (typeof(registerUser))
export {registerUser}