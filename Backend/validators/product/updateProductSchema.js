import Joi from 'joi'

const updateProductSchema = Joi.object({
    productName: Joi.string().label("Product Name"),
    productType: Joi.string().valid('AGRO','NONAGRO').label("Product Type"),
    productQuantityType: Joi.string().valid('KG','LTR','NOS').label("Product Quantity Type"),
    productForm :Joi.string().label("Product Form"),
    productDescription:Joi.string().label("Product Description"),
    nutrientContent:Joi.array().items(Joi.string()).min(1).label("Nutrient Content"),
    isOrganic: Joi.boolean().label("Is Organic"),
    keyFeatures: Joi.array().items(Joi.string()).min(1).label("Key Features"),
    applications: Joi.array().items(Joi.string()).min(1).label("Applications"),
    isPremium:Joi.boolean().label("Is Premium")
})

export default updateProductSchema ;