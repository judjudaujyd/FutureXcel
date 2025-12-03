import healthModel from "../Models/healthSchema.js";

// A Function For Creating Health Records
const createHealth = async(req,res) => {
    try{

        // Extracting User Data Fromm Body
        const healthData = {
            title : req.body.title,
            content : req.body.content
        }

        await healthModel.create(healthData);
        console.log("Record Created Succesfully!");
        res.status(200).json({msg : "Record Submitted"});
    }catch(e){
        console.error("Error Creating Record - healthController.js",e.message);
        res.status(400).json({ msg : `Error Creating Record ${e.message}`})
    }
}

// A Functiion For Retriving Data 

const getHealth = async(req ,res ) => {
    try{
        const healthData = await healthModel.find();
        res.status(200).json({ msg : healthData});
    }catch(e){
        console.error("Error Retriving Data - healthController.js");
        res.status(400).json({ msg : `Error Retriving Data - ${e.message}`});
    }
}
export {createHealth , getHealth}