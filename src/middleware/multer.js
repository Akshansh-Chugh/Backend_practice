import multer from "multer"
import fs from "fs"

const storage= multer.diskStorage(
    {
        destination:function(req,file,doubt)
        {
            doubt(null,"public/images")
        },
        filename:function(req,file,cb)
        {
            cb(null,file.originalname + "-" + Date.now()
        )
        }
    })
const upload=multer({storage:storage})
export default {upload}  // use as upload.single("avatar")

