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

    if(galleryImages.length == 0){
        return next(new AppError(404, 'No gallery images found !'))
    }

    res.status(200).json({
        success: true,
        galleryImages
    })
})


export {addImagesToGallery,getAllGalleryImages}