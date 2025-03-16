import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    codePos : {
        type : String,
        default : ""
    },
    country : {
        tyep : String,
        default : ""
    },
    mobile : {
        type : String,
        default : ""
    },
    status : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const AddressModel = mongoose.model('address',addressSchema)
export default AddressModel