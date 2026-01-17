import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import { apiError } from "../utils/apiErrors.js"
import { toCloud } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"
import fs from "fs"
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async (req, res) => {
    // Input validation
    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password)
        throw new apiError(400, "All fields are required");
    

    const processedUsername = username.toLowerCase().trim();
    const processedEmail = email.toLowerCase().trim();

    // existing user
    const existingUser = await User.findOne({
        $or: [{ username: processedUsername }, { email: processedEmail }],
    });

    if (existingUser) {
        throw new apiError(409, "Username or email already exists");
    }

    // Check for files
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const profilePicLocalPath = req.files?.profilePic?.[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar is required");
    }

    // Upload to Cloudinary
    let avatarCloud, profilePicCloud;
    try {
        [avatarCloud, profilePicCloud] = await Promise.all([
            toCloud(avatarLocalPath),
            profilePicLocalPath ? toCloud(profilePicLocalPath) : Promise.resolve(null)
        ]);
    } finally {
        // Cleanup 
        fs.promises.unlink(avatarLocalPath).catch(err => console.error(`Failed to delete temp file: ${avatarLocalPath}`, err));
        if (profilePicLocalPath) {
            fs.promises.unlink(profilePicLocalPath).catch(err => console.error(`Failed to delete temp file: ${profilePicLocalPath}`, err));
        }
    }

    if (!avatarCloud) {
        throw new apiError(502, "Avatar could not be uploaded");
    }
    
    // Create user
    const user = await User.create({
        fullName,
        username: processedUsername,
        email: processedEmail,
        password,
        avatar: avatarCloud.url,
        profilePic: profilePicCloud?.url || "",
    });

    // refresh token save
    const createdUser = await User.findByIdAndUpdate(
        user._id,
        { $set: { refreshToken: user.generateRefreshToken() } },
        { new: true }
    ).select("-password");

    if (!createdUser) {
        throw new apiError(500, "Something went wrong, user not created");
    }

    // Return
    return res.status(201).json(
        new apiResponse(201, createdUser, "User registered successfully")
    );
});

const cookieSettings={
        httpOnly:true,
        secure: true
    }
const loginUser= asyncHandler(async (req,res)=>
{
    //body -> uername , email, pwd and not empty
    // user exsists 
    // pwd
    // tokens
    // cookies
    // retun ok

    const {username , email , password} = req.body;

    if (!password) {
        throw new apiError(400, "Password is required");
    }

    let user;
    if (username) {
        user = await User.findOne({ username: username.toLowerCase().trim() }).select("-__v -createdAt -updatedAt");
    } else if (email) {
        user = await User.findOne({ email: email.toLowerCase().trim() }).select("-__v -createdAt -updatedAt");
    } else {
        throw new apiError(400, "Username or email is required");
    }
    if (!user)
        throw new apiError(404,"User not found")
    
    
    if(!await user.isPwdCorrect(password))
         throw new apiError(401,"Invalid credentials")


    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    await User.findByIdAndUpdate(user._id,
        {
            $set:
            {
                refreshToken:refreshToken
            }
        },
        {
            new:true
        }
    )
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
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set:
                {
                    refreshToken:undefined
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


const generateTokens= asyncHandler(async (req,res)=>
{
    //old refreshtoken
    // decode
    // search with id
    // verify
    // new refreshToken
    // new accessToken
    // store refresh 
    // res
    const refreshToken = req.cookies?.refreshToken   // Header X -> duplicate use of cookie
    if(!refreshToken) throw new apiError(404,"missing refresh token")
    const decodedToken=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY)
    if (!decodedToken) throw new apiError(401,"refresh token could not be verified")

    const user= await User.findById(decodedToken._id)
    if (!user) throw new apiError(404,"user not found ")
    if (refreshToken !== user.refreshToken) 
    throw new apiError(401,"Invalid refresh token")


    const accessToken=user.generateAccessToken()
    const newRefreshToken=user.generateRefreshToken()
    
    await User.findByIdAndUpdate(
        user._id,
        {
            $set:
            {
                refreshToken:newRefreshToken
            }
        },
        {
            new:true
        }
    )


    res.status(200)
    .cookie("refreshToken",newRefreshToken,cookieSettings)
    .cookie("accessToken",accessToken,cookieSettings)
    .json(new apiResponse(200,
        {}, "Updated successful"
    ))
}
)
export {

    registerUser,
    loginUser,
    logoutUser,
    generateTokens
}
