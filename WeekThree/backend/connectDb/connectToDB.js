import mongoose from "mongoose";

// FUNCTION FOR ESTABLISHING LINK WITH DB
const connectToDB = async(DB_URL) => {
    try{
        await mongoose.connect(DB_URL);
        console.log(`Established Link With DB [${DB_URL}]`)
    }catch(e){
        console.error(e.message , "Error Establishing Connection With Database");
    }
}

export default connectToDB;