import Product from "../models/productModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const addProduct = catchAsync(async (req,res,next) => {
    try {
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

    if (
        !productName ||
        !productType ||
        !productQuantityType ||
        !productForm ||
        !productDescription ||
        !Array.isArray(nutrientContent) || keyFeatures.length === 0 ||
         typeof isOrganic !== 'boolean' ||
        !Array.isArray(keyFeatures) || keyFeatures.length === 0 ||
        !Array.isArray(applications) || applications.length === 0 ||
         typeof isPremium !== 'boolean'
        ) {
        return next(new AppError(400, 'All fields are required and must be valid'));
    }

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

    if(!newProduct){
        return next(new AppError(400, 'Error while adding new product !'))
    }

    await newProduct.save()


    res.status(200).json({
        success: true ,
        message: 'Product added successfully !',
        newProduct
    })
    } catch (error) {
        console.log(error);
        
    }

})

export {addProduct}
