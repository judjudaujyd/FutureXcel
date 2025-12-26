import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  task : {
    type : String,
    required : false
  },
  done : {
    type : Boolean,
    required : false,
    default : false
  }
});

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  members: {
    type: [memberSchema],
    default: []
  }
}, {
  timestamps: true
});

const batchModel = mongoose.model("Batch", batchSchema);
export default batchModel;
