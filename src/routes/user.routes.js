import {Router} from "express"
import {registerUser , loginUser , logoutUser} from "../controllers/user.controller.js"
import upload from "../middleware/multer.js"
import Jwt from "../middleware/auth.middleware.js"

const router=Router()

router.route("/login").post(upload.upload.none(),loginUser)
router.route("/register").post(
    upload.upload.fields([{name:"avatar",maxCount:1} ,{name:"profilePic",maxCount:1}]),
    registerUser)
// router.route("/login").post(loginUser)
router.route("/logout").post(upload.upload.fields([{name:"avatar",maxCount:1} ,{name:"profilePic",maxCount:1}]),Jwt,logoutUser)

export default router