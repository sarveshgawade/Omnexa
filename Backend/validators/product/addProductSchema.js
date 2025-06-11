
import Joi from 'joi'

const addProductSchema = Joi.object({
    productName: Joi.string().required(),
    productType: Joi.string().valid('AGRO','NONAGRO').required(),
    productQuantityType: Joi.string().valid('KG','LTR','NOS').required(),
    productForm :Joi.string().required(),
    productDescription:Joi.string().required(),
    nutrientContent:Joi.array().items(Joi.string()).min(1).required(),
    isOrganic: Joi.boolean().required(),
    keyFeatures: Joi.array().items(Joi.string()).min(1).required(),
    applications: Joi.array().items(Joi.string()).min(1).required(),
    isPremium:Joi.boolean().required(),
})

export default addProductSchema ;