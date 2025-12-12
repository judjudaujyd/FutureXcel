import mongoose from "mongoose";

const connectToDB = async(DB_URL) => {

    try{
        await mongoose.connect(DB_URL);
        console.log(`Connected To Database : ${DB_URL}`)
    }catch(e){
        console.error("Failed To Connect To DB - connectToDb.js:9")
    }

}

export default connectToDB;