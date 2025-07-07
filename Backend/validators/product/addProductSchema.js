import Joi from 'joi'

const addProductSchema = Joi.object({
    productName: Joi.string().required().label("Product Name"),
    productType: Joi.string().valid('AGRO','NONAGRO').required().label("Product Type"),
    productQuantityType: Joi.string().valid('KG','LTR','NOS', 'TONS').required().label("Product Quantity Type"),
    productForm :Joi.string().required().label("Product Form"),
    productDescription:Joi.string().required().label("Product Description"),
    nutrientContent:Joi.array().items(Joi.string()).label("Nutrient Content"),
    isOrganic: Joi.boolean().required().label("Is Organic"),
    keyFeatures: Joi.array().items(Joi.string()).min(1).required().label("Key Features"),
    applications: Joi.array().items(Joi.string()).min(1).required().label("Applications"),
    isPremium:Joi.boolean().required().label("Is Premium"),
    productShelfLife: Joi.number().required().label("Product Shelf Life")
})

export default addProductSchema ;