import {Router} from "express"
import {} from "../models/subscription.models.js"
import Jwt from "../middleware/auth.middleware.js"


const router = Router()

router.route("/subscribe").post(Jwt,)
router.route("/unsubscribe").post(Jwt,)
router.route("/checkNewContent").post(Jwt,)
router.route("/notifyToSubscribers").post(Jwt,)

export default router