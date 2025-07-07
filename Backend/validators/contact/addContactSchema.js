import Joi from 'joi'
import mongoose from 'mongoose'

const addContactSchema = Joi.object({
  fullName: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .required()
      .label("Full Name"),

  email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } }) 
      .required()
      .label("Email"),

  companyName: Joi.string()
    .trim()
    .required()
    .label("Company Name"),

  country: Joi.string()
    .trim()
    .required()
    .label("Country"),

  productId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid Product ID!')
      }
      return value
    })
    .required()
    .label("Product ID"),

  estimatedQuantity: Joi.string()
    .trim()
    .required()
    .label("Estimated Quantity"),

  description: Joi.string()
    .trim()
    .required()
    .label("Description"),
})

export default addContactSchema