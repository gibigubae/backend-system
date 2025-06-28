import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config/env.js";
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream'

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = (buffer, folder = 'uploads')=>{
    return new Promise((resolve, reject) => {

        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer); 
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,

                
                resource_type: 'auto', 
            },
            (error, result) => {
                if (error) {
                    console.error('Error uploading image:', error);
                    return reject('Error uploading image');
                }

                resolve(result.secure_url);
            }
        );
        
        bufferStream.pipe(uploadStream); 
    });
}
