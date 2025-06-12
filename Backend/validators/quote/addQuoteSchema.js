import Joi from 'joi';
import mongoose from 'mongoose';

const addQuoteSchema = Joi.object({
    contactPersonName: Joi.string()
        .trim()
        .required()
        .label(' Contact Person Name'),

    companyEmail: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: false } })
        .required()
        .label('Company Email'),

    address: Joi.string()
        .trim()
        .required()
        .label('Address'),

    companyName: Joi.string()
        .trim()
        .required()
        .label('Company Name'),

    mobileNumber: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .label('Mobile Number'),

    additionalInfo: Joi.string()
        .trim()
        .allow('', null)
        .label('Additional Info'),

    productId: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('Invalid Product ID');
            }
            return value;
        }),

    country: Joi.string()
        .trim()
        .required()
        .label('Country Name'),

    requiredQty: Joi.number()
        .min(1)
        .required()
        .label('Required Quantity'),

    isUrgent: Joi.boolean()
        .required()
        .label('Urgency of product'),

    deliveryLocation: Joi.string()
        .trim()
        .required()
        .label('Delivery Location'),

    heardFrom: Joi.string()
        .valid('Google', 'Friend', 'LinkedIn', 'Advertisement', 'Other')
        .required()
        .label('Heard from'),
});

export default addQuoteSchema;
