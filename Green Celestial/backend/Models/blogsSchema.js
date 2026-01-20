import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins"
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    meta_keywords: {
        type: String
    },
    meta_desc: {
        type: String
    },
    category: {
        type: String,
        index: true // Index for filtering by category
    },
    date: {
        type: Date,
        default: Date.now(),
        index: true // Index for sorting by date
    },
    comments: [
        {
            type: String
        }
    ],
    views: {
        type: Number,
        default: 0
    }
})

const blogModel = mongoose.model("blogs", blogSchema);
export default blogModel;