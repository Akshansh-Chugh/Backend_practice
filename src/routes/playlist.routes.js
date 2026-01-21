import {Router} from "express"
import {} from "../models/playlist.models.js"
import Jwt from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.js"


const router = Router()

router.route("/create").post(Jwt,upload.upload.fields([{name:"thumbnail",maxCount:1},{name:"videos",maxCount:10}]),)
router.route("/delete").post(Jwt,)
router.route("/addVideo").post(Jwt,upload.upload.fields([{name:"thumbnail",maxCount:1},{name:"videos",maxCount:1}]),)
router.route("/removeVideo").post(Jwt,)
router.route("/reOrder").post(Jwt,)
router.route("/getPlaylist").post()
router.route("/update").post(Jwt,)

export default router