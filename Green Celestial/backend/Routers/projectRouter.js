import express from "express";
import { getAllProjects, createProject, getProjectById, deleteProject } from "../Controllers/projectController.js";
import upload from "../middleware/upload.js";
import { authenticate } from "../middleware/auth.js"; // Assume we want to protect this

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post("/", upload.single('image'), createProject);
projectRouter.delete("/:id", deleteProject); // Add delete route, maybe protect it later if needed but for now keep consistent

export default projectRouter;