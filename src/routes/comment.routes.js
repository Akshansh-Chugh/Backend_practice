import {Router} from "express"
import {} from "../models/comment.models.js"
import Jwt from "../middleware/auth.middleware.js"


const router = Router()

router.route("/post").post(Jwt,)
router.route("/edit").post(Jwt,)
router.route("/delete").post(Jwt,)
router.route("/reply").post(Jwt,)  // rethink
router.route("/getComments").post(Jwt,)

export default router