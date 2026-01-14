import multer from "multer"

const storage= multer.diskStorage(
    {
        destination:function(req,file,cb)
        {
            cb(null,"src/public/images")
        },
        filename:function(req,file,cb)
        {
            cb(null,file.originalname)
        }
    })
const upload=multer({storage:storage})
export default {upload}  // use as upload.single("avatar")

