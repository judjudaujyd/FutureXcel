import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role : {
        type : String,
        required : true,
        unique : true,
        trim : true
    }
},{
    timestamps : false
});

const roleModel = mongoose.model("roles",roleSchema);

export default roleModel;

