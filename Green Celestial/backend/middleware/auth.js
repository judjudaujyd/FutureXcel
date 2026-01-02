import jsonwebtoken from "jsonwebtoken"
import adminModel from "../Models/adminSchema.js";

const authenticate = async (req,res,next) => {

    const secKey = "Ana Dark_Knight";

    const token = req.header("auth-token");
    if(!token){
        res.status(400).json({ error : "Access Denied" });
    }
    try {
        const data = jsonwebtoken.verify(token,secKey);
        const user =await adminModel.findOne({_id : data.user.id});
        if(!user){
            throw error('Invalid Token');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error : "Access Denied" })
    }
}

export {authenticate}