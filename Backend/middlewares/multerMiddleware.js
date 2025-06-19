import {Readable} from 'stream'
import cloudinary from '../config/cloudinary.js'
import multer from 'multer';


const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export  { upload, uploadToCloudinary };
