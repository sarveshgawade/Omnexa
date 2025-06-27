import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type : 'String' ,
        required: [true, 'Product Name is a required field !'],
        trim : true,
        unique: true 
    },
    productType: {
        type:'String',
        enum: ['AGRO','NONAGRO'],
        default: 'AGRO',
        required: [true, 'Product Type is a required field !']
    },
    productQuantityType:{
        type:'String',
        enum: ['KG','LTR','NOS'],
        default: 'NOS',
        required: [true, 'Product Quantity is a required field !']
    },
    productForm :{
        type : 'String' ,
        required: [true, 'Product Form is a required field !'],
        trim : true 
    },
    productDescription: {
        type : 'String' ,
        required: [true, 'Product Description is a required field !'],
        trim : true 
    },
    nutrientContent: {
        type: [String],
        required: function () {
            return this.productType === 'AGRO';
        },
        validate: {
            validator: function (arr) {
            return this.productType !== 'AGRO' || arr.length > 0;
            },
            message: 'Nutrient content must have at least one item for AGRO products.'
        }
    },
    isOrganic: {
        type : 'Boolean' ,
        required: [true, 'Product Organicness is a required field !'],
        trim : true 
    },
    keyFeatures: {
        type: [String], 
        required: [true, 'Product Key features is a required field!'],
        validate: {
            validator: function (arr) {
                return arr.length > 0; // Ensure it's not an empty array
            },
            message: 'Key features must have at least one item.'
        }
    },
    applications: {
        type: [String], 
        required: [true, 'Product Applications is a required field!'],
        validate: {
            validator: function (arr) {
                return arr.length > 0; // Ensure it's not an empty array
            },
            message: 'Product Applications must have at least one item.'
        }
    },
    productImages:[{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'}
    }],
    productThumbnail:{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'}
    },
    isPremium:{
        type : 'Boolean' ,
        required: [true, 'Product Premiumness  is a required field !'],
        trim : true 
    },
    productShelfLife:{
        type: Number, // in months
        required: [true, 'Product Shelf Life is a required field!'],
    }
})

const Product = model('Product',productSchema)

export default Product