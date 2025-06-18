import {Product} from "../models/model.index.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import fs from 'fs/promises'
import cloudinary from 'cloudinary'

const addProduct = catchAsync(async (req,res,next) => {
    
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
        isPremium
    } = req.body;


    const existingProduct = await Product.findOne({productName, productType})

    if(existingProduct){
        return next(new AppError(400, 'Product with given name and type already exists'))
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
        productImage:{
            public_id :'Dummy',
            secure_url :'Dummy'
        }
    })

    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'omnexa_products'})

            if(result){ 
                newProduct.productImage.public_id = result.public_id
                newProduct.productImage.secure_url = result.secure_url

                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            console.log( 'Error while uploading image ' , error.message)
        }
    }

    if(!newProduct){
        return next(new AppError(400, 'Error while adding new product !'))
    }

    await newProduct.save()


    res.status(201).json({
        success: true ,
        message: 'Product added successfully !',
        product : newProduct
    })
    

})

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

const updateProduct = catchAsync( async (req,res,next) => {
    const {productId} = req.params
    
    if(!productId){
        return next(new AppError(400,'Please provide product ID for the product to be updated !'))
    }
    
    const product = await Product.findById(productId)
    
    if(!product){
        return next(new AppError(400,'Product with given ID not found !'))
    }
    
    let updates = {}
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
        "productImage",
    ];
    
    if(!req.body){
        return next(new AppError(400,'Provide atleast one field to be updated !'))
    }

    for(let key of allowedFields){
        if(req.body[key] !== undefined){
            updates[key] = req.body[key]
        }
    }

   

    const updatedProduct = await Product.findByIdAndUpdate(productId,updates, {new: true, runValidators: true})

    if(req.file){
         try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'omnexa_products'})

            if(result){ 
                updatedProduct.productImage.public_id = result.public_id
                updatedProduct.productImage.secure_url = result.secure_url

                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            console.log( 'Error while uploading image ' , error.message)
        }
    }

    if(!updatedProduct){
        return next(new AppError(400,'Error while updating the product !'))
    }

    await updatedProduct.save()

    res.status(200).json({
        success: true ,
        message: "Product updated successfully !",
        product: updatedProduct
    })
})


export {addProduct,deleteProduct,getAllProducts,getProduct,updateProduct}
