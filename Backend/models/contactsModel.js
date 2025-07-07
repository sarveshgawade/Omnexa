import mongoose, {  model } from 'mongoose'

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is a required field!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is a required field!'],
    trim: true,
    lowercase: true,
  },
  companyName: {
    type: String,
    required: [true, 'Company Name is a required field!'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is a required field!'],
    trim: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required!'],
  },
  estimatedQuantity: {
    type: String,
    required: [true, 'Estimated Quantity is a required field!'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is a required field!'],
    trim: true,
  },
}, {
  timestamps: true
})

const Contact = model('Contact', contactSchema)

export default Contact
