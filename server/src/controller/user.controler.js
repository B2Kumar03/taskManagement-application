import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import AVTAR from "../models/userAvtar.model.js";
import cloudinaryUpload from "../utils/cloudinary.js";
import dotenv from "dotenv"
dotenv.config()

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id.toString,
      name: user.name,
      email: user.email,
    },
    "kya_dekh_raha_hai_binod",
    {
      expiresIn: "1h",
    }
  );
}

const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(401)
      .json({ message: "please provide all fields", success: false });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(401)
      .json({ message: "User already exist with this email", success: false });
  }
  const newUser = await User.create({ email, password, name });
  return res.status(200).json({
    message: "User created successfully",
    success: true,
    data: newUser,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "please provide all fields", success: false });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found", success: false });
  }
  if (user.password != password) {
    return res
      .status(401)
      .json({ message: "Password is incorrect", success: false });
  }
  const token = generateToken(user);
  return res.status(200).json({
    message: "User logged in successfully",
    success: true,
    token: token,
  });
};
const getUser = async (req, res) => {
  const userEmail = req.user.email; 

  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail }).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};
const uploadAvtar = async (req,res) => {
 
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  const localPathFile = req.file?.path;
  console.log(localPathFile);
  if (!localPathFile) {
    return res.status(400).json({ success: false, message: "Please upload a file" });
  }

  const cloudinaryUrl = await cloudinaryUpload(localPathFile);
  
  if (!cloudinaryUrl.url) {
    return res.status(500).json({ success: false, message: "Error occurred while uploading file" });
  }

  const storeInDatabase = await AVTAR.create({
    email,
    url: cloudinaryUrl.url,
  });

  return res.status(200).json({ success: true, message: "Avtar uploaded successfully", data: storeInDatabase });
}


const updateAvatar = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  const localPathFile = req.file?.path;
  if (!localPathFile) {
    return res.status(400).json({ success: false, message: "Please upload a file" });
  }

  try {
    const cloudinaryUrl = await cloudinaryUpload(localPathFile);
    
    if (!cloudinaryUrl.url) {
      return res.status(500).json({ success: false, message: "Error occurred while uploading file" });
    }

    const updatedAvatar = await AVTAR.findOneAndUpdate(
      { email: email },
      { url: cloudinaryUrl.url },
      { new: true } // Return the updated document
    );

    if (!updatedAvatar) {
      return res.status(404).json({ success: false, message: "Avatar not found for the provided email" });
    }

    return res.status(200).json({ success: true, message: "Avatar updated successfully", data: updatedAvatar });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};







export { register, login,getUser,uploadAvtar,updateAvatar };
