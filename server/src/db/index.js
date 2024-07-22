import mongoose from "mongoose";
export const DatabseConncetion = async () => {
  try {
    const mongoInstance = await mongoose.connect(
      "mongodb+srv://bk7355583:kcRXgi0BetELo6Oj@cluster0.l8wlsuu.mongodb.net/newApp"
    );

    console.log("Databse connected successfully✅");
  } catch (error) {
    console.log("Something error occurs while connecting the database🔴");
  }
};
