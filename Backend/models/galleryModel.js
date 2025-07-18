import mongoose, { model } from "mongoose"

const gallerySchema = new mongoose.Schema({
    galleryImages:[{
        public_id :{ type: 'String'},
        secure_url :{ type: 'String'}
    }]
},
{
    timestamps:true
})

const Gallery = model('Gallery',gallerySchema)

export default Gallery