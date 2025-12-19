import mongoose from "mongoose";

// PREPARING A SCHEMA FOR TASK MODEL
const taskSchema = new mongoose.Schema({
    task : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    dueDate : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

// DFING TASK MODEL
const taskModel = new mongoose.model("task",taskSchema);

// EXPORTING TASK MODEL
export default taskModel;