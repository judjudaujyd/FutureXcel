import mongoose from "mongoose"

const connectToDB = async(DB_URL) => {
    
    try {
        await mongoose.connect(DB_URL);
        console.log(`CONNECTED TO DB ${DB_URL}`);    
    } catch (error) {
        console.error(`ERROR CONNECTING TO DB - ${error.message}`);
    }

}

export default connectToDB;