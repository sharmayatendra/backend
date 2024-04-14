import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileOnCloudinary = async (filePath: string) => {
  try {
    if (!filePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      format: "jpg",
    });
    // console.log("file uploaded successfully", response);
    // unlink the file since its uploaded successfully
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    // remove the file from local if somehow it fails to upload on cloudinary
    fs.unlinkSync(filePath);
    return null;
  }
};
