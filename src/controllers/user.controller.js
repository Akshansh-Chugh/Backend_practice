import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import { apiError } from "../utils/apiErrors.js"
import { toCloud } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"
import fs from "fs"

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
    
    username = username.toLowerCase().trim()
    email = email.toLowerCase().trim();

    if (!username || !email || !password || !fullName) throw new apiError(400,"All fields are required")


    if (await User.findOne({
        $or: [ { username }, { email } ]
    }))
        throw new apiError(411,"Already exists")
    
    const avatar_l=req.files?.avatar[0]?.path
    let profilePic_l
    if (Array.isArray(req.files.profilePic) && req.files.profilePic.length > 0) profilePic_l=req.files?.profilePic[0]?.path

    if (!avatar_l) throw new apiError(400,"Avatar is required")

    const avatar_c=await toCloud(avatar_l)
    const profile_c=await toCloud(profilePic_l)

    fs.unlinkSync(avatar_l)
        if (profilePic_l) fs.unlinkSync(profilePic_l)
    
    if (!avatar_c) throw new apiError(502,"Avatar could not be uploaded")
    const user= await User.create(
        {
            fullName:fullName,
            username:username.toLowerCase(),
            email:email,
            password:password,
            avatar:avatar_c.url,
            profilePic:profile_c?.url ||""
        }
    )
    const created= await User.findById(user._id).select("-password -refreshtoken")

    if (!created) throw new apiError(500,"Something went wrong , user not created")

    return res.status(200).json(
            new apiResponse(200 , created, "user registered successfully")
        )
})


const loginUser= asyncHandler(async (req,res)=>
{
    //body -> uername , email, pwd and not empty
    // user exsists 
    // pwd
    // tokens
    // cookies
    // retun ok

    console.log(req.body)
    var {username , email , password}=req.body
    username=username.toLowerCase().trim()
    email=email.toLowerCase().trim()

    if ((!username && !email) || !password ) 
        throw new apiError(400,"All fields are required")
    
    
    const user =await User.findOne({$or: [ { username }, { email } ]})
    
    if (!user)
        throw new apiError(404,"User not found")
    
    
    if(!await user.isPwdCorrect(password))
         throw new apiError(401,"Invalid credentials")

    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    const cookieSettings={
        httpOnly:true,
        secure: true
    }
    res.status(200)
    .cookie("accessToken",accessToken,cookieSettings)
    .cookie("refreshToken",refreshToken,cookieSettings)


    .json( new apiResponse(200, 
        {
            user : user,
            accessToken : accessToken,
            refreshToken : refreshToken
        },
        "Login successful"
    ))})

    const logoutUser= asyncHandler(async (req,res)=>
    {
        const cookieSettings={
        httpOnly:true,
        secure: true
    }
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set:
                {
                    refreshtoken:undefined
                }
            },
            {
                new:true
            
            }
        )

        return res.status(200)
        .clearCookie("accessToken",cookieSettings)
        .clearCookie("refreshToken",cookieSettings)
        .json(new apiResponse(200,{},"Logout successful"))
    })

export {

    registerUser,
    loginUser,
    logoutUser
}
