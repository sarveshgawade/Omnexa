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

const getContacts = catchAsync(async (req,res,next) => {
    const contacts = await Contact.find({})

    if(contacts.length == 0){
         return next(new AppError(400, `No contacts found!`));
    }

     res.status(200).json({
         success: true ,
         message: 'Contacts found !',
         contacts
    })
})

const getContactById = catchAsync(async (req,res,next) => {
    const {id} = req.params

    if(!id){
         return next(new AppError(400, `Contact ID is required!`));
    }

    const contact = await Contact.findById(id)

    if(!contact){
         return next(new AppError(400, `No contact found with given ID!`));
    }

     res.status(200).json({
         success: true ,
         message: 'Contact found !',
         contact
    })
})

export {addNewContact,getContactById,getContacts}