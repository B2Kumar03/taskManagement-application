import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

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

export { register, login };
