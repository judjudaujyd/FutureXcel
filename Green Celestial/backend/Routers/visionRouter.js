import express from "express";
import { getVision, updateVision } from "../Controllers/visionController.js";

const visionRouter = express.Router();

visionRouter.get("/", getVision);
visionRouter.post("/", updateVision);

export default visionRouter;
