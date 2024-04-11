const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: mongoose.SchemaTypes.Decimal128,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: [String],
        required: true
    },
    isFeatured:{
        type: Boolean,
        required: true,
        default: false
    },
    merchantName:{
        type: String,
        required: true
    },
    merchantLocation:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product',productSchema)