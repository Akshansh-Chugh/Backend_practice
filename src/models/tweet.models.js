import mongoose,{Schema} from "mongoose";

const tweetSchema= new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"owner is required"]
    },
    content:{
        type:String,
        required:[true,"A tweet is required"]
    }
}, {timestamps:true}
)

export const Tweet= mongoose.model("Tweet",tweetSchema)

// add,edit,delete