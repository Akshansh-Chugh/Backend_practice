import mongoose , { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{},
        email:{},
        password:{},
        watchHistory:[{}], 
        liked:[{}],
        comments:[{}],
        subscribed:[{}],
        playlists:[{}],
        joinedChannels:[{}],
        joinedOn:{},
        lastUsedOn:{},
        premiumPlanValidTill:{},
        premiumPlan:{}
    },
    {
        timestamps:true
    },
)

