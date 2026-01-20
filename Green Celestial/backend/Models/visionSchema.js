import mongoose from "mongoose";

const visionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

const visionModel = mongoose.model("vision", visionSchema);
export default visionModel;
