import {v2 as cloudnary} from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudnary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

// console.log(process.env.CLOUDINARY_CLOUD_NAME)
// console.log(process.env.CLOUDINARY_API_KEY)
// console.log(process.env.CLOUDINARY_API_SECRET)
const toCloud = async(file)=>
{
    try
    {
        if (!file) 
            {
                console.log("no file")
                return null}
        const response =await cloudnary.uploader.upload(file,
            {
                resource_type:"auto"
            }
        )
        console.log(`${file.resource_type} uploaded at ${response.secure_url}}`)
        return response
    }
    catch(error)
    {
        console.log(error)
        // if (file) fs.unlinkSync(file)
        // return response
    }
}

export {toCloud}