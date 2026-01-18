import mongoose from "mongoose";

const subscriptionSchema= new mongoose.Schema(
    {
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:[true, "subscriber is required"]
        },
        by:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:[true,"channel is required"]
        }
    },{timestamps:true}
)

export const Subscription= mongoose.model("Subscription",subscriptionSchema)