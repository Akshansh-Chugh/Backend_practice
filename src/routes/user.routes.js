import {Router} from "express"
router.route("/getCurrentUser").post(Jwt,getCurrentUser)
import {registerUser , loginUser , logoutUser, generateTokens, changeUserPassword, getCurrentUser, updateUserDetails, updateAvatar, updateProfilePic} from "../controllers/user.controller.js"
import upload from "../middleware/multer.js"
import Jwt from "../middleware/auth.middleware.js"

const router=Router()

router.route("/login").post(loginUser)
router.route("/register")
.post(upload.upload.fields([{name:"avatar",maxCount:1} ,{name:"profilePic",maxCount:1}]),
    registerUser)

// secure
router.route("/logout").post(Jwt,logoutUser)
router.route("/refreshTokens").post(generateTokens)
router.route("/changePassword").post(Jwt,changeUserPassword)
router.route("/getCurrentUser").post(Jwt,getCurrentUser)
router.route("/update").post(Jwt,updateUserDetails)
router.route("/updateAvatar").post(Jwt,upload.upload.single("avatar"),updateAvatar)
router.route("/updateProfilePic").post(Jwt,upload.upload.single("profilePic"),updateProfilePic)


export default router