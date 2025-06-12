import {Quote} from "../models/model.index.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

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

export {addQuote,deleteQuote}