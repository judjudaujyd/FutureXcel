import express from 'express';
import { markRecord, sendRecord, getTrafficStats } from "../Controllers/trafficController.js";

const trafficRouter = express.Router();


trafficRouter.post("/", markRecord);
trafficRouter.get("/", sendRecord);
trafficRouter.get("/stats", getTrafficStats);

export default trafficRouter;