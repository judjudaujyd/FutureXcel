// IMPORTING REQUIRED MODULES
import express from "express";
import { body , validationResult } from "express-validator";


// DEFING A ROUTER FOR TASKS
const taskRouter = express.Router();

// IMPORTING REQUIRED CONTROLLERS
import { getTasks ,addTask , updateTask , removeTask ,markCompleated } from "../Controllers/taskControllers.js";

// GET MODE
taskRouter.get("/",getTasks);

// POST A TASK
taskRouter.post("/",[
    body("task","Task Is Required").notEmpty(),
    body("dueDate","Due Date Is Required").notEmpty()
],(req,res,next) => {
    const errors = validationResult(req);

    // CHECK FOR ERRORS
    if(!errors.isEmpty()){
        res.status(400).json({error : errors.array()});
        return;
    }

    // PROCEED TO CONTROLLER IF ALL PARAMETERS ARE DEFINED PROPERLY
    next();
},addTask);

// MARK TASK AS COMPLEATED
taskRouter.post("/mark",markCompleated);


// DELETE A TASK
taskRouter.delete("/delete",removeTask);

// UPDATE TASK
taskRouter.put("/update",updateTask);

// EXPORTING TASK ROUTER
export default taskRouter