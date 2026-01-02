import bcrypt from "bcrypt";
import adminModel from "../Models/adminSchema.js";
import jsonwebtoken from "jsonwebtoken";


// =================FUNCTION TO HANDLE CREATION OF A USER=====================
const adminCreate = async(req,res) => {

    const passSalt = await bcrypt.genSalt(10);
    const saltedPass = await bcrypt.hash(req.body.password,passSalt);

    const newAdmin = new adminModel({
        name : req.body.name,
        mail : req.body.mail,
        password : saltedPass,
        contact_no : req.body.contact_no,
        image : req.body.image
    });

    await newAdmin.save()
    .then((result) => {
        const userData = {
            user : { id : result.id , name : result.name , mail : result.mail}
        }
        const secKey = "Ana Dark_Knight";
        const authToken = jsonwebtoken.sign(userData,secKey);
        res.status(200).json({ message : "Your Account Has Been Created Succesfully" , authToken : authToken});
    }).catch((error) => {
        res.status(400).json({ error : error })
    })
}

// ==============FUNCTION TO AUTHENTICATE A USER=====================

const adminLogin = async(req,res) => {
 
    const { mail , password } = req.body;
    let userExsist = await adminModel.findOne({mail : mail});

    if(!userExsist){
        return res.status(400).json({ message : "Invalid Credentials" });
    }

    const passCompare = await bcrypt.compare(password,userExsist.password);
    if(!passCompare){
        return res.status(400).json({ message : "Inavlid Credentials" });
    }

    const userData = {
        user : { id : userExsist.id ,name : userExsist.name , mail : userExsist.mail}
    }
    const secKey = "Ana Dark_Knight";
    const authToken = jsonwebtoken.sign(userData,secKey);
    res.status(200).json({ message : "You Have Sucessfully Logged In" , authToken : authToken});
}


export {adminCreate,adminLogin};