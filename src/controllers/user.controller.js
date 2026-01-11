import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser= asyncHandler((res,req)=>
{
    res.status(200).json(
        {
            message:"ok"
        }
    )
})
console.log (typeof(registerUser))
export {registerUser}