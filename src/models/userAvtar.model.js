import mongoose from "mongoose";

const avtarSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true,
        trime:true
    },
    email:{
        type:String,
        required:true
    }
})

const AVTAR=mongoose.model("AVTAR",avtarSchema);

export default AVTAR