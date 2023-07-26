import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
dotenv.config();

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});

// Function for uploading images to Cloudinary
export const cloudinaryUpload = (
  imageUrl: string,
  identifier?: string,
  imageTags?: string[],
  imageFolder?: string
) =>
  cloudinary.uploader.upload(
    imageUrl,
    {
      public_id: identifier,
      tags: imageTags,
      folder: imageFolder || 'Saved Images'
    },
    function (error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    }
  );

// Function for configuring multer upload middleware
export const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(null, false);
      throw new Error('Only images are allowed');
    }
  }
});
