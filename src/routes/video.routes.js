import {Router} from "express"
import {} from "../models/video.models.js"
import Jwt from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.js"


const router = Router()

router.route("/upload").post(Jwt,
    upload.upload.fields(
        [{name:"video",maxCount:1} ,{name:"thumbnail",maxCount:1}]),
    )
router.route("/publish").post(Jwt,)
router.route("/update").post(Jwt,)
router.route("/delete").post(Jwt,)
router.route("/getDetails").post()

export default router