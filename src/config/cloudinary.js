import {v2 as cloudinary} from "cloudinary"


cloudinary.config({
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY , 
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary