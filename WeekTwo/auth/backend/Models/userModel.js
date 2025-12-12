import mongoose from "mongoose";

// DEFING A SCHEMA
const userSchema = new mongoose.Schema({
    username : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    },
    token : {
        required : false,
        type : String
    }
},{
    timestamps : true
})

// DEFING A MODEL
const userModel = new mongoose.model("user",userSchema);

// EXPORTING USERMODEL
export default userModel;