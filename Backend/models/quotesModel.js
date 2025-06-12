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
        trim: true,
        match: [/^[0-9]{10,15}$/, 'Please enter a valid mobile number']
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
        type: 'Boolean'
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
    }
}, {
    timestamps: true
});

const Quote = model('Quote', quoteSchema);

export default Quote;
