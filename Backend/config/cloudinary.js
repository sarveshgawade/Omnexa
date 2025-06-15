import cloudinary from 'cloudinary'
import { configDotenv } from 'dotenv'
configDotenv()

cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudinary