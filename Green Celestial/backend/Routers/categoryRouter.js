import express from "express";
import { authenticate } from "../middleware/auth.js";
import { body , validationResult } from "express-validator";
import { createCategory, getCategory } from "../Controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/",getCategory);

categoryRouter.post("/",authenticate,[
    body('categoryName','Category Name Can Not Be Empty').notEmpty(),
    body('categoryName','Category Name Must Be Atleast 3 Digits Long').isLength({min : 3}),
    body('categoryDesc','Category Description Can Not Be Empty').notEmpty(),
    body('categoryDesc',"Category Description Must Be 10 Characthers Atleast").isLength({min : 10})
],(req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({ error : error.array() });
    }else{
        next();
    }
},createCategory)


export default categoryRouter;