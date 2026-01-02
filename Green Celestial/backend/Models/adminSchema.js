import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    mail : {
        type : String,
        required : true,
        index : { unique : true }
    },
    password : {
        type : String,
        required : true
    },
    contact_no : {
        type : String,
        required : true
    },
    image : {
        type : String,
        reuired : true
    }
});

const adminModel = mongoose.model("admins",adminSchema);
export default adminModel;