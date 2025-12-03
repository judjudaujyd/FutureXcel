import mongoose from "mongoose";

// ASYNC FUNCTION FOR ESTABLISHING A CONNECTION WITH THE DATABASE
const connectToDB = async (URL) => {
    // Type validation for URL
    if (typeof URL !== "string") {
        console.log(`DB_URL IS INVALID - Provided URL : ${URL}`);
        return 0;
    }

    // ATTEMPT ESTABLISHING A CONNECTION WITH THE DATABASE
    try {
        await mongoose.connect(URL);
        console.log("Connected To Database Successfully");
    } catch (error) {
        console.error("There Was An Error Establishing Connection With The Database - ", error.message);
    }
};

export default connectToDB;
