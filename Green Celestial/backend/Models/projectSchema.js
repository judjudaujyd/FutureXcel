import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    contents : {
        type : String,
        required : true
    },
    f_image : {
        type : String,
        required : true
    },
    date : {
        default : Date.now()
    }
});

const projectModel = mongoose.model("projects",projectSchema);
export default projectModel;