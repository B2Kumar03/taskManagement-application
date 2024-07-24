import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "src/.env" });
const url = process.env.DBURI;
export const DatabseConncetion = async () => {
  try {
    const mongoInstance = await mongoose.connect(url);

    console.log("Databse connected successfully✅");
  } catch (error) {
    console.log("Something error occurs while connecting the database🔴");
  }
};
