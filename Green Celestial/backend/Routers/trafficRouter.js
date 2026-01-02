import express from 'express';
import { markRecord ,sendRecord } from '../Controllers/trafficController.js'

const trafficRouter = express.Router();


trafficRouter.post('/',markRecord);
trafficRouter.get('/',sendRecord);

export default trafficRouter;