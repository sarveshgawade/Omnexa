import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../middlewares/multerMiddleware.js";
import Gallery from "../models/galleryModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const addImagesToGallery = catchAsync(async (req, res, next) => {

    if(req.files.length == 0){
        return next(new AppError(400, 'Gallery images are required !'))
    }

    let uploadedImages = []
    try {
        uploadedImages = await Promise.all(req.files.map(file => uploadToCloudinary(file.buffer,'omnexa_gallery')
        .then(result => ({
            public_id: result.public_id,
            secure_url: result.secure_url
        }))))
        
    } catch (error) {
        console.log("Error while uploading gallery images : ",error.message)
        return next(new AppError(400, 'Error while uploading gallery images !'))
    }

    let existingGallery = await Gallery.find()
    let gallery = []

    if(existingGallery.length > 0){
        existingGallery[0].galleryImages.push(...uploadedImages)

        await existingGallery[0].save()
        gallery = existingGallery[0].galleryImages
    }else{

        gallery = await Gallery.create({
            galleryImages: uploadedImages
        })
    }


    res.status(201).json({
        success: true,
        message: 'Gallery images added successfully !',
        galleryImages: gallery
    })
    
    
})

const getAllGalleryImages = catchAsync(async (req,res,next) => {
    const galleryImages = await Gallery.find()

    if(galleryImages.length == 0 || galleryImages[0].galleryImages.length == 0){
        return next(new AppError(404, 'No gallery images found !'))
    }

    res.status(200).json({
        success: true,
        galleryImages
    })
})

const deleteImageById = catchAsync(async (req,res,next) => {
    const {imageId} = req.params

    if(!imageId){
        return next(new AppError(400, 'Image ID is required !'))
    }

    const galleryImages = await Gallery.find()
    
    if(galleryImages.length == 0 || galleryImages[0].galleryImages.length == 0){
        return next(new AppError(404, 'No gallery images found !'))
    }
    
    const imageIndex = galleryImages[0].galleryImages.findIndex(image =>image._id.toString() === imageId)
    

    if(imageIndex === -1){
        return next(new AppError(404, 'Image with given ID not found !'))
    }

    galleryImages[0].galleryImages.splice(imageIndex,1)

    galleryImages[0].save()

    res.status(200).json({
        success: true,
        message: 'Image deleted successfully !',
        galleryImages: galleryImages[0].galleryImages
    })

})

const deleteAllImages = catchAsync(async (req,res,next) => {
    await Gallery.deleteMany()

    res.status(200).json({
        success: true,
        message: 'All images deleted successfully !'
    })
})

export {addImagesToGallery,getAllGalleryImages,deleteImageById,deleteAllImages}