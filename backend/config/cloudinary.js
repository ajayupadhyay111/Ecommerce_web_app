import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Create Cloudinary Storage Engine for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const allowedFormats = ["jpg", "jpeg", "png", "webp"];  // Allowed formats
        const fileExtension = file.mimetype.split("/")[1];       // Extract format from mimetype
    
        // Check if the format is allowed, otherwise default to png
        const format = allowedFormats.includes(fileExtension) ? fileExtension : "png";
    
        return {
          folder: "Ecommerce products",                       // Folder in Cloudinary
          format: format,                          // Image format
          public_id: `${Date.now()}-${file.originalname}`  // Unique public ID
        };
    }
  });
  

  export { cloudinary, storage };