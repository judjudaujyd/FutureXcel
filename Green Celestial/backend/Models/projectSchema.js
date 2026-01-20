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
    image : { // Changed from f_image to image for clarity, or kept as alias if needed. sticking to image as per plan
        type : String,
        required : true
    },
    category: {
        type: String,
        required: true,
        index: true // Index for filtering
    },
    price: {
        type: Number,
        required: true
    },
    date : {
        type: Date,
        default : Date.now
    }
});

const projectModel = mongoose.model("projects",projectSchema);
export default projectModel;