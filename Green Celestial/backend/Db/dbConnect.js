import mongoose from "mongoose";

const connectToDb = async( URL ) => {
    try {
        await mongoose.connect(URL);
        console.log("Connected To DB")
    }catch(error){
        console.log(error);
    }
}

export default connectToDb;