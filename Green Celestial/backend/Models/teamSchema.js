import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        index : { unique : true }
    },

    role : {
        type : String,
        required : true
    },

    about : {
        type : String,
        required : true
    },

    img : {
        type : String,
        required : true
    },

    skills : 
        {
            type : String
        }
    
});

const teamModel = mongoose.model("team",teamSchema);
export default teamModel;