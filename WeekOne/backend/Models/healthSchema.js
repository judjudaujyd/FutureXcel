import mongoose from "mongoose";

// Creating  A Health Schema
const healthSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

// Creating A healthModel For Mongoose Operations
const healthModel = mongoose.model("health", healthSchema);

export default healthModel;
