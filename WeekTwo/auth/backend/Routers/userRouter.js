// IMPORTING REQUIRED DEPENDENCIES
import express from "express";
import { body , validationResult } from "express-validator";

// DEFING USER ROUTER
const userRouter = express.Router();

// IMPORTING REQUIRED CONTROLLERS - Controllers/userControllers.js
import { genUser, verifyUser } from "../Controllers/userControllers.js";

// ROUTE FOR GENERATING A USER
userRouter.post("/",[
    // EXPRESS VALIDATOR VALIDATES ALL INCOMING INPUTS
    body("username","Username Is Taken / Invalid").notEmpty(),
    body("email","Email Is Required").notEmpty().isEmail(),
    body("password","Password Format Is Invalid").notEmpty().isLength({min : 8}),
],(req,res,next) => {
    const validationErrors = validationResult(req);
    // RETURN/DROP REQUEST IF PARAMETS ARE INVALID
    if(!validationErrors.isEmpty()){
        res.status(400).json({ error : validationErrors.array() });
    }

    // PROCEED IS EVERYTHING CHECKS OUT
    next();
},genUser);


// ROUTE FOR SIGNING USER IN
userRouter.post("/login", [
    // EXPRESS VALIDATOR VALIDATES ALL INCOMING INPUTS
    body("email", "email is required").notEmpty(),
    body("password", "password is require").notEmpty().isLength({ min : 8 })
],(req,res,next) => {
    const validationErrors = validationResult(req);

    // RETURN/DROP REQUEST IF PARAMETS ARE INVALID
    if (!validationErrors){
        res.status(400).json({ msg : validationErrors.array()});
    }

    // PROCEED IF EVERYTHING CHECKS OUT
    next();
}, verifyUser);


// EXPORTING USER ROUTER
export default userRouter;