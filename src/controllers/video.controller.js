import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { toCloud, cloudDelete } from "../utils/cloudinary.js"
import { Video } from "../models/video.models.js"
import ffmpeg from "fluent-ffmpeg"
import fs from "fs"
import { apiError } from "../utils/apiErrors.js"

const getDuration = (path) => {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(path, (err, metadata) => {
                if (err) return reject(err);
                resolve(metadata.format.duration);
            });
        });
    };

const upload= asyncHandler(async (req,res)=>
{
    const {title,description,isPublic,isPublished}=req.body
    if (!title || !description) throw new apiError(400,"All fields are required")

    const video_l=req.files?.video?.[0]?.path
    const thumbnail_l=req.files?.thumbnail?.[0]?.path
    
    if (!video_l || !thumbnail_l) throw new apiError(400,"All fields are required")
    const duration= await getDuration(video_l)

    const video_c= await toCloud(video_l)
    const thumbnail_c= await toCloud(thumbnail_l)

    if(!video_c.secure_url || !thumbnail_c.secure_url || !duration) throw new apiError(502,"Video corrupted or thumbnail could not be uploaded")

    if (video_l) fs.unlinkSync(video_l)
    if (thumbnail_l) fs.unlinkSync(thumbnail_l)
    
    const video= await Video.create({
        title,
        description,
        duration,
        videoUrl:video_c.secure_url,
        thumbnailUrl:thumbnail_c.secure_url,
        isPublic,
        isPublished,
        owner:req.user._id
    },{new:true })

    res.status(201)
    .json(new apiResponse(201,video,"Video uploaded successfully"))

})

const publish= asyncHandler(async (req,res)=>
{
    // check video._id
    // modification allowed
    // find and edit
    // save

    const video=req.video
    
    if(!req.canModify) throw new apiError(401,"Unauthorized")
    
    video.isPublished=!video.isPublished
    await video.save({validateBeforeSave:false})

    res.status(200)
    .json(new apiResponse(200,video,"publish successfull"))
})
const updateDetails= asyncHandler(async (req,res)=>
{
    const video = req.video
    const {title,description,isPublic,isPublished}=req.body

    if (!req.canModify) throw new apiError(401,"Unauthorized")
    
    video.title=title
    video.description=description
    video.isPublic=isPublic
    video.isPublished=isPublished

    await video.save({validateBeforeSave:false})

    res.status(200)
    .json(new apiResponse(200,video,"Update successfull"))
})
const deleteVideo= asyncHandler(async (req,res)=>
{
    // video
    // authorised
    // delete from cloudinary video and thumbnail
    // delete from db

    const video=req.video

    if (!req.canModify) throw new apiError(401,"Unauthorized")

    await cloudDelete(video.videoUrl)
    await cloudDelete(video.thumbnailUrl)
    await Video.findByIdAndDelete(video._id)

    res.status(200)
    .json(new apiResponse(200,video,"Delete successfull"))
})
const getDetails= asyncHandler(async (req,res)=>
{
    const video=req.video
    res.status(200)
    .json(new apiResponse(200,video,"Fetch successfull"))
})

export {
    upload,            // jwt, multer
    publish,           // jwt, getVideo,
    updateDetails,     // jwt, getVideo,
    deleteVideo ,      // jwt, getVideo,
    getDetails,        // getVideo,
}