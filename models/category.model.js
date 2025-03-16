import mongoose from "mongoose";

const categorySchema = new mongoose.Schema ({
    name : {
        tyep : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

const CategoryModel = mongoose.model('categoty',categorySchema)
export default CategoryModel