import {Router} from "express"
import { publish , updateDetails, deleteVideo, upload as uploadController} from "../controllers/video.controller.js"
import Jwt from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.js"
import { getVideo } from "../middleware/video.middleware.js"

const router = Router()

router.route("/upload").post(Jwt,
    upload.upload.fields(
        [{name:"video",maxCount:1} ,{name:"thumbnail",maxCount:1}]),uploadController)
router.route("/publish").post(Jwt,getVideo,publish)
router.route("/update").post(Jwt,getVideo,updateDetails)
router.route("/delete").post(Jwt,getVideo,deleteVideo)
router.route("/getDetails").post(getVideo)

export default router