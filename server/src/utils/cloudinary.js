import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv"
import { format } from "path";
dotenv.config()

// Configuration

cloudinary.config({
  cloud_name:"dqxb5eram",
  api_key:"285549978784612",
  api_secret:"Dk4SsUuO85MGAhmLsWsgPCebyoE",
});


const cloudinaryUpload = async (localFilePath) => {
 
  try {
    if (!localFilePath) {
      return null;
    }
    //upload the file on cloudinary
    
    const response = await cloudinary.uploader.upload(localFilePath, {
     resource_type: "auto",
    })
    fs.unlinkSync(localFilePath);
    return response;
    //file has been uploaded successfully
    console.log("File is uploaded on cloudinary");
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally save temprorly file got failed
    console.log("Error occurs while uploading file on cluodniry",error);
    return null;
  }
};

export default cloudinaryUpload;
