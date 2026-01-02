import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    }
})

const categoryModel = mongoose.model("categories",categorySchema);
export default categoryModel;