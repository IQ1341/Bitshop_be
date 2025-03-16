import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        tyep : String,
        default : ""
    },
    image : {
        type : Array,
        default : []
    },
    category : [
            {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    subCategory : [ 
            {
            type : mongoose.Schema.ObjectId,
            ref : 'subCategory'
        }
    ],
    unit : {
        type : String,
        default : ""
    },
    stock : {
        type : Number,
        default : null
    },
    price : {
        type : Number,
        default : mull
    },
    discount : {
        tyep : Number,
        default : null
    },
    description : {
        type : String,
        default : ''
    },
    more_details : {
        type : Object,
        default : {}
    },
    publish : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
})

const ProductModel = mongoose.model('product',productSchema)
export default ProductModel