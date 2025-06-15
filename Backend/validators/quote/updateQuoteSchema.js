import Joi from 'joi';
import mongoose from 'mongoose';

const updateQuoteSchema = Joi.object({
    contactPersonName: Joi.string()
        .trim()
        .label(' Contact Person Name'),

    companyEmail: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: false } })
        .label('Company Email'),

    address: Joi.string()
        .trim()
        .label('Address'),

    companyName: Joi.string()
        .trim()
        .label('Company Name'),

    mobileNumber: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .label('Mobile Number'),

    additionalInfo: Joi.string()
        .trim()
        .allow('', null)
        .label('Additional Info'),

    productId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message('Invalid Product ID');
            }
            return value;
        }),

    country: Joi.string()
        .trim()
        .label('Country Name'),

    requiredQty: Joi.number()
        .min(1)
        .label('Required Quantity'),

    isUrgent: Joi.boolean()
        .label('Urgency of product'),

    deliveryLocation: Joi.string()
        .trim()
        .label('Delivery Location'),

    heardFrom: Joi.string()
        .valid('Google', 'Friend', 'LinkedIn', 'Advertisement', 'Other','Instagram')
        .label('Heard from'),
});

export default updateQuoteSchema;
