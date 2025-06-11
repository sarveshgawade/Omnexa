import Joi from 'joi'

const updateProductSchema = Joi.object({
    productName: Joi.string(),
    productType: Joi.string().valid('AGRO','NONAGRO'),
    productQuantityType: Joi.string().valid('KG','LTR','NOS'),
    productForm :Joi.string(),
    productDescription:Joi.string(),
    nutrientContent:Joi.array().items(Joi.string()).min(1),
    isOrganic: Joi.boolean(),
    keyFeatures: Joi.array().items(Joi.string()).min(1),
    applications: Joi.array().items(Joi.string()).min(1),
    isPremium:Joi.boolean()
})

export default updateProductSchema ;