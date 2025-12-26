import express from "express";

// IMPORTING REQUIRED CONTROLLERS
import { createRole, delRoles, getRoles } from "../Controllers/roleControllers.js";

// CREATING A ROLE ROUTER
const roleRouter = express.Router();

// RETRIVE ALL ROLES
roleRouter.get("/",getRoles);

roleRouter.post("/",createRole);

roleRouter.delete("/",delRoles)
export default roleRouter;