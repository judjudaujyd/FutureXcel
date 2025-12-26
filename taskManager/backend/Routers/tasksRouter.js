import express from "express";
import { assignTask, deleteTask, markAsDone } from "../Controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/assign",assignTask);
taskRouter.post("/done",markAsDone);
taskRouter.post("/delete",deleteTask);

export default taskRouter;