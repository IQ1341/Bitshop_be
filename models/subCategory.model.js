import mongoose from "mongoose";

const  subCategorySchema = new mongoose.Schema({
    name : {
        tyep : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    category : [
        {
            type : mongoose.Schema.ObjectI,
            ref : 'category'
        }
    ]
},{
    timestamps : true
})

const SubCategoryModel = mongoose.model('subCategory',subCategorySchema)
export default SubCategoryModel