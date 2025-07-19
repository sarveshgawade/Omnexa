import mongoose, { model } from "mongoose";

const quoteSchema = new mongoose.Schema({
    contactPersonName: {
        type: 'String',
        required: [true, 'Contact Person Name is a required field!'],
        trim: true
    },
    companyEmail: {
        type: 'String',
        required: [true, 'Company Email is a required field!'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
    },
    address: {
        type: 'String',
        required: [true, 'Address is a required field!'],
        trim: true
    },
    companyName: {
        type: 'String',
        required: [true, 'Company Name is a required field!'],
        trim: true
    },
    mobileNumber: {
        type: 'String',
        required: [true, 'Mobile Number is a required field!'],
        trim: true
    },
    additionalInfo: {
        type: 'String',
        trim: true,
        default: ''
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is a required field!']
    },
    country: {
        type: 'String',
        required: [true, 'Country is a required field!'],
        trim: true
    },
    requiredQty: {
        type: 'Number',
        required: [true, 'Required Quantity is a required field!'],
        min: [1, 'Quantity must be at least 1']
    },
    isUrgent: {
        type: 'Boolean',
        required: [true, 'isUrgent is a required field!'],
    },
    isCustomPackagingRequired: {
        type: 'Boolean',
        required: [true, 'isCustomPackagingRequired is a required field!'],
    },
    deliveryLocation: {
        type: 'String',
        required: [true, 'Delivery Location is a required field!'],
        trim: true
    },
    heardFrom: {
        type: 'String',
        enum: ['Google', 'Friend', 'LinkedIn', 'Advertisement', 'Other',"Instagram"],
        required: [true, 'Source (Heard From) is a required field!'],
        trim: true
    },
    packagingType: {
        type: 'String',
        enum: ['PLASTIC_SHAKER', 'CORRUGATED_BOX', 'WOODEN_BOX', 'PALLET_PACKING', 'PLASTIC_PALLET', 'FIBC_BAG', 'PLASTIC_BAG', 'PP_BAG', 'THERMOCOL_BOX', 'BUBBLE_WRAP'],
        required: [true, 'Packaging Type is a required field!'],
        trim: true
    },
    quotedByEmail:{
        type: 'String',
        required: [true, 'User Email is a required field!'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
    }

}, {
    timestamps: true
});

const Quote = model('Quote', quoteSchema);

export default Quote;