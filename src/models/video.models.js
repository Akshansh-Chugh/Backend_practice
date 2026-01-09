import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        videoUrl:{
            type:String,
            required:true,
        },
        thumbnailUrl:{
            type:String,
            required:true,
        },
        views:{
            type:Number,
            default:0
        },
        likes:{
            type:Number,
            default:0
        },
        dislikes:{
            type:Number,
            default:0
        },
        comments:{
            type:Number,
            default:0
        },
        duration:{
            type:Number,
            required:true,
        },
        isPublic:{
            type:Boolean,
            default:false
        },
        isPublished:{
            type:Boolean,
            default:false
        },
        publishedAt:{
            type:Date,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },

    }
    ,{timestamps:true}
)

videoSchema.plugin(mongooseAggregatePaginate)
export const Video= mongoose.model("Video",videoSchema)