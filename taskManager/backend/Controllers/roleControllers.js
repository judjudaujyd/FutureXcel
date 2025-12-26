import roleModel from "../Models/roleModel.js";

const createRole = async(req,res) => {
    try{
        const records = await roleModel.create({ role : req.body.role });
        if(records){
            res.status(200).json({sucess : records});
        }
    }catch(e){
        console.error(e.message);
        res.status(400).json({error : "There was an error creating roles"});
    }
}

const getRoles = async(req,res) => {
    try{
        const records = await roleModel.find();
        if(records){
            res.status(200).json({roles : records});
        }
    }catch(e){
        console.error(e.message);
        res.status(400).json({error : "There was an error retriving roles"});
    }
}

const delRoles = async(req,res) => {
    try {
        const record = await roleModel.deleteOne({role : req.body.role});
        if(record){
            res.status(200).json({sucess : "Record Deleted Succesfully"});
        }
    } catch (e) {
        console.error(e.message);
        res.status(400).json({error : "There was an error deletinng roles"});
    }
}

export { createRole , getRoles , delRoles };