import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { toCloud } from "../utils/cloudinary.js"
import { Video } from "../models/video.models.js"
import ffmpeg from "ffmpeg"

const upload= asyncHandler(async (req,res)=>
{
    const {title,description,isPublic,isPublished}=req.body
    if (!title || !description) throw new apiError(400,"All fields are required")

    const video_l=req.files?.video?.[0]?.path
    const thumbnail_l=req.files?.thumbnail?.[0]?.path
    
// duration from ffmpeg
    if (!video_l || !thumbnail_l) throw new apiError(400,"All fields are required")

    const video_c= await toCloud(video_l)
    const thumbnail_c= await toCloud(thumbnail_l)

    if(!video_c.secure_url || !thumbnail_c.secure_url) throw new apiError(502,"Video or thumbnail could not be uploaded")

    if (video_l) fs.unlinkSync(video_l)
    if (thumbnail_l) fs.unlinkSync(thumbnail_l)
    
    const video= await Video.create({
        title,
        description,
        videoUrl:video_c.secure_url,
        thumbnailUrl:thumbnail_c.secure_url,
        isPublic,
        isPublished,
        owner:req.user._id
    })


})

const publish= asyncHandler(async (req,res)=>
{

})
const updateDetails= asyncHandler(async (req,res)=>
{

})
const deleteVideo= asyncHandler(async (req,res)=>
{

})
const getDetails= asyncHandler(async (req,res)=>
{

})

export {
    upload, // jwt,multer
    publish, // jwt
    updateDetails, // jwt
    deleteVideo , // jwt
    getDetails
}