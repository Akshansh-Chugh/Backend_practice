import { asyncHandler } from "../utils/asyncHandler";
import { Video } from "../models/video.models.js";
import { apiResponse } from "../utils/apiResponse.js";  
import { apiError } from "../utils/apiErrors";

const getVideo= asyncHandler(async (req,res)=>
{
    const video= await Video.findOne({username:req.params.username})
    if (!video) throw new apiError(404,"Video not found")
    req.video=video

    if (req.user === video.owner)
        req.canModify=true
    else
        req.canModify=false

    res.status(200)
    .json(new apiResponse(200,video,"Fetch successfull"))
})

export {getVideo}