import {Router} from "express"
import {} from "../models/tweet.models.js"
import Jwt from "../middleware/auth.middleware.js"


const router = Router()

router.route("/post").post(Jwt,)
router.route("/edit").post(Jwt,)
router.route("/delete").post(Jwt,)
router.route("/getTweets").post(Jwt,)
router.route("/reTweet").post(Jwt,)

export default router