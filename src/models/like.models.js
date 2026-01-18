import mongoose, {Schema} from "mongoose"

const likeSchema= new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"owner is required"]
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    },
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tweet'
    }

},{timestamps:true})

export const Like= mongoose.model("Like",likeSchema)

// add,remove