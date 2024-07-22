import mongoose from "mongoose";

const todoShcema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    title: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
  },
  id: {
    type: String,
    required: true,
    trim: true,
  },
});

const TODO = mongoose.model("TODO", todoShcema);



export default TODO;
