import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema({
    device : {
        type : String
    },
    ip : {
        type : String
    },
    preview_id : {
        type : String
    },
    userAgent : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

const trafficModel = mongoose.model("traffic",trafficSchema);
export default trafficModel;