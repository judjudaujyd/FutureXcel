import express from "express";
import { adminCreate ,adminLogin } from "../Controllers/adminController.js";
import { body , validationResult } from 'express-validator';
import { authenticate } from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/create",[
    body('name',"Enter A Valid Name").isLength({min : 3}),
    body('mail',"Enter A Valid Email").isEmail(),
    body('password',"Create A Strong Password").notEmpty(),
    body('password',"Create A Strong Password").isLength({ min : 8 }),
    body('contact_no',"Enter A Contact Number").notEmpty()
],(req,res,next) => {
    let results = validationResult(req);
    if(!results.isEmpty()){
        res.status(400).json({error : results.array()});
    }else{
        next();
    }
},adminCreate);


adminRouter.post("/login",[
    body('mail',"Enter A Valid Email").isEmail(),
    body('password',"Password Can Not Be Empty").notEmpty(),
    body('password',"Password Must Be 8 Characters Long").isLength({ min : 8 })
],(req,res,next) => {
    console.log(req.body);
    let results = validationResult(req);
    if(!results.isEmpty()){
        res.status(400).json({ error : results.array() });
    }else{
        next()
    }
},adminLogin);

export default adminRouter;