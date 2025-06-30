import {Product} from "../models/model.index.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import fs from 'fs/promises'
// import cloudinary from 'cloudinary'
import {uploadToCloudinary} from '../middlewares/multerMiddleware.js'

const addProduct = catchAsync(async (req, res, next) => {

    const {
        productName,
        productType,
        productQuantityType,
        productForm,
        productDescription,
        nutrientContent,
        isOrganic,
        keyFeatures,
        applications,
        isPremium,
        productShelfLife
    } = req.body;

    const existingProduct = await Product.findOne({ productName, productType });

    if (existingProduct) {
        return next(new AppError(400, 'Product with given name and type already exists'));
    }

    let uploadedThumbnail = {
        public_id: 'Dummy',
        secure_url: 'Dummy'
    };
    
    let uploadedImages = []

    // uploading thumbnail into cloudinary
    if (req.files.productThumbnail[0]) {
        try {
            const result = await uploadToCloudinary(req.files.productThumbnail[0].buffer, 'omnexa_products');

            uploadedThumbnail.public_id = result.public_id;
            uploadedThumbnail.secure_url = result.secure_url;

        } catch (error) {
            console.error('Error while uploading thumbnail:', error.message);
        }
    }

    // uploading images into cloudinary
    if(req.files.productImages){
        try {
            uploadedImages = await Promise.all(req.files.productImages.map( file => 
                uploadToCloudinary(file.buffer,'omnexa_products')
                .then(result =>({
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }))
            ))
        } catch (error) {
            console.error('Error while uploading product images:', error.message);
        }
    }


    const newProduct = await Product.create({
        productName,
        productType,
        productQuantityType,
        productForm,
        productDescription,
        nutrientContent,
        isOrganic,
        keyFeatures,
        applications,
        isPremium,
        productThumbnail: uploadedThumbnail,
        productShelfLife,
        productImages: uploadedImages
    });

    res.status(201).json({
        success: true,
        message: 'Product added successfully!',
        product: newProduct
    });

});


const deleteProduct = catchAsync( async (req,res,next) => {
    const {productId} = req.params

    if(!productId){
        return next(new AppError(400,'Please provide product ID for the product to be deleted !'))
    }

    const deletedProduct = await Product.findByIdAndDelete(productId)
    
    if(!deletedProduct){
        return next(new AppError(400,'Product with given ID not found !'))
    }

    res.status(200).json({
         success: true ,
         message: 'Product deleted successfully !',
         product: deletedProduct
    })
    
})

const getAllProducts = catchAsync(async (req,res,next) => {
    const products = await Product.find()

    if(products.length == 0){
        return next(new AppError(400,'No Product Found !'))
    }

    return res.status(200).json({
        success: true ,
        message: 'Products Fetched Successfully !',
        products
    })
})

const getProduct = catchAsync(async (req,res,next) => {
    const {productId} = req.params

    if(!productId){
        return next(new AppError(400,'Please provide product ID for the product to be deleted !'))
    }

    const product = await Product.findById(productId)

    if(!product){
        return next(new AppError(400,'Product with given ID not found !'))
    }

    return res.status(200).json({
        success: true ,
        message: 'Product found !',
        product
    })

})

const updateProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) {
    return next(new AppError(400, 'Please provide product ID for the product to be updated!'));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError(400, 'Product with given ID not found!'));
  }

  const allowedFields = [
    "productName",
    "productType",
    "productQuantityType",
    "productForm",
    "productDescription",
    "nutrientContent",
    "isOrganic",
    "keyFeatures",
    "applications",
    "isPremium",
    "productShelfLife"
  ];

  const updates = {};

  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  // Upload new thumbnail if provided
  if (req.files?.productThumbnail?.[0]) {
    try {
      const result = await uploadToCloudinary(req.files.productThumbnail[0].buffer, 'omnexa_products');
      updates.productThumbnail = {
        public_id: result.public_id,
        secure_url: result.secure_url
      };
    } catch (error) {
      console.error("Error while uploading thumbnail:", error.message);
    }
  }

  // Upload new product images if provided
  if (req.files?.productImages?.length) {
    try {
      const uploadedImages = await Promise.all(
        req.files.productImages.map(file =>
          uploadToCloudinary(file.buffer, 'omnexa_products').then(result => ({
            public_id: result.public_id,
            secure_url: result.secure_url
          }))
        )
      );

      updates.productImages = uploadedImages;
    } catch (error) {
      console.error("Error while uploading product images:", error.message);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully!",
    product: updatedProduct
  });
});


export {addProduct,deleteProduct,getAllProducts,getProduct,updateProduct}
