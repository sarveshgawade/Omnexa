import { quoteEmailTemplate } from "../emailTemplates/quoteEmailTemplate.js";
import {Product, Quote} from "../models/model.index.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendEmail from "../utils/sendEmail.js";

const addQuote = catchAsync(async (req,res,next) => {
    const {
        contactPersonName,
        companyEmail,
        address,
        companyName,
        mobileNumber,
        additionalInfo,
        productId,
        country,
        requiredQty,
        isUrgent,
        deliveryLocation,
        heardFrom
    } = req.body
    
    const timeWindowInHours = 24;
    const currentTime = new Date(); 
    const windowStartTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);

    const existingQuote = await Quote.findOne({
        companyEmail,
        productId, 
        requiredQty , 
        createdAt: {$gte : windowStartTime}
    })

    if(existingQuote){
        return next(new AppError(400,'A similar quote request has already been submitted recently. Please wait before submitting again'))
    }

    const newQuote = await Quote.create({
        contactPersonName,
        companyEmail,
        address,
        companyName,
        mobileNumber,
        additionalInfo,
        productId,
        country,
        requiredQty,
        isUrgent,
        deliveryLocation,
        heardFrom
    })

    try {

        const product = await Product.findById(productId)

        const quoteDetails = {
            contactPersonName,
            companyEmail,
            address,
            companyName,
            mobileNumber,
            additionalInfo,
            productId,
            country,
            requiredQty,
            isUrgent,
            deliveryLocation,
            heardFrom
        }

        if(product){
            quoteDetails.productName = product.productName
        }

        const html = quoteEmailTemplate(quoteDetails)

        await sendEmail({
            to: "aditya.jagtap@omnexaglobaltrade.com , adityajagtap095376@gmail.com",
            subject: "New Quote Received !",
            html
        });
    } catch (error) {
        console.log(error);
        
        return next(new AppError(400,'Error in sending email for quote!'))
    }

    if(!newQuote){
        return next(new AppError(400,'Error in submitting quote !'))
    }

    res.status(200).json({
        success: true,
        message: 'Quote submitted successfully !',
        quote: newQuote
    })
        
})

const deleteQuote = catchAsync( async (req,res,next) => {
    const {quoteId} = req.params

    if(!quoteId){
            return next(new AppError(400,'Please provide quote ID for the quote to be deleted !'))
    }

    const deletedQuote = await Quote.findByIdAndDelete(quoteId)

    if(!deletedQuote){
        return next(new AppError(400,'Quote with given ID not found !'))
    }

    res.status(200).json({
         success: true ,
         message: 'Quote deleted successfully !',
         deletedQuote: deletedQuote
    })
})

const getQuote = catchAsync(async (req,res,next) => {
    const {quoteId} = req.params

    if(!quoteId){
        return next(new AppError(400,'Please provide quote ID for the quote to be deleted !'))
    }

    const quote = await Quote.findById(quoteId)

    if(!quote){
        return next(new AppError(400,'Quote with given ID not found !'))
    }

    res.status(200).json({
        success: true ,
        message: 'Quote found !',
        quote
    })
})

const getAllQuotes = catchAsync(async (req,res,next) => {
    const quotes = await Quote.find()

    if(quotes.length == 0){
        return next(new AppError(400,'No Quote Found !'))
    }

    return res.status(200).json({
        success: true ,
        message: 'Quotes Fetched Successfully !',
        quotes
    })
}) 

const updateQuote = catchAsync(async(req,res,next) => {
    const {quoteId} = req.params
    
    if(!quoteId){
        return next(new AppError(400,'Please provide quote ID for the quote to be updated !'))
    }

    const quote = await Quote.findById(quoteId)

    if(!quote){
        return next(new AppError(400,'Quote with given ID not found !'))
    }

    let updates = {}
    const allowedFields = [
        "contactPersonName",
        "companyEmail",
        "address",
        "companyName",
        "mobileNumber",
        "additionalInfo",
        "productId",
        "country",
        "requiredQty",
        "isUrgent",
        "deliveryLocation",
        "heardFrom"
    ];
    
    if(!req.body){
        return next(new AppError(400,'Provide atleast one field to be updated !'))
    }

    for(let key of allowedFields){
        if(req.body[key] !== undefined){
            updates[key] = req.body[key]
        }
    }

    const updatedQuote = await Quote.findByIdAndUpdate(quoteId,updates,{new:true, runValidators:true})

    if(!updatedQuote){
        return next(new AppError(400,'Error while updating the quote !'))
    }

    res.status(200).json({
        success: true ,
        message: "Quote updated successfully !",
        quote: updatedQuote
    })
})

export {addQuote,deleteQuote,getQuote,getAllQuotes,updateQuote}