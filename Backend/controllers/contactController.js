import mongoose from 'mongoose';
import {Contact} from '../models/model.index.js'
import catchAsync from "../utils/catchAsync.js";
import AppError from '../utils/AppError.js';

const addNewContact = catchAsync( async (req,res,next ) => {
    const {
        fullName,
        email,
        companyName,
        country,
        productId,
        estimatedQuantity,
        description,
    } = req.body

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); 

    const existingContact = await Contact.findOne({
        fullName,
        email,
        productId: new mongoose.Types.ObjectId(productId),
        createdAt: { $gte: oneDayAgo }
    });

    if(existingContact){
         return next(new AppError(400, `You've already tried contacting, try after some time !`));
    }

    const newContact = await Contact.create({
        fullName,
        email,
        companyName,
        country,
        productId,
        estimatedQuantity,
        description
    });

    if(!newContact){
        return next(new AppError(400, 'Error in contacting'));
    }

    res.status(200).json({
         success: true ,
         message: 'Contacted successfully !',
         contact: newContact
    })
}) 

export {addNewContact}