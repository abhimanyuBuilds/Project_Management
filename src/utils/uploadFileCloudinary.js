import cloudinary from "../config/cloudinary.js"
import fs from "fs";



export const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resorce_type: "auto"
        });
        console.log("✅ File uploaded on cloudinary. File src:" + response.url)

        // once the file is uploaded deleting from our server
        fs.unlinkSync(localFilePath)

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}


export const deleteFromCloudinary = async(publicId) => {
    try {

        const result = await cloudinary.uploader.destory(publicId)

        console.log("File from cloudinary deleted successfully:✅")
        
    } catch (error) {
        console.log("Error while deleting the file from cloudinary❌" , error)
        return null
    }
}