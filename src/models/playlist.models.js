import mongoose , {Schema} from "mongoos"

const playlistSchema= new Schema(
    {
        title:{
            type:String,
            required: [true,"define Name"],
            default:`Playlist by ${this.owner.fullName}`
        },
        description:{
            type:String
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:[true,"owner is required"]
        },
        videos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video',
        }]
    },{timetamaps:true}
)

export const Playlist= mongoose.model("Playlist",playlistSchema)

// createPlaylist(tiTle,vIdeos,OWNer,description),{update}->{title,name,description},addVideos,RemoveVideos