import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "macview-packages",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
    resource_type: "auto",
    access_mode: "public",
  },
});

const upload = multer({ storage });

export default upload;
