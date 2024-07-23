import mongoose from "mongoose";

const todoShcema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: Boolean,
  id: {
    type: String,
    required: true,
    trim: true,
  },
},{timestamps:true});

const TODO = mongoose.model("TODO",todoShcema);

export default TODO;
