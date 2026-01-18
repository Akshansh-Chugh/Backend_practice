import mongoose , {Schema} from "mongoose"

const CommentSchema= new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"owner is required"]
    },
    content:{
        type:String,
        required:[true,"A comment is required"]
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
        required:[true,"video is required"]
    }
},{timestamps:true})

export const Comment= mongoose.model("Comment",CommentSchema)

// add,edit,delete