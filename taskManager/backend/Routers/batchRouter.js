import express from "express";
import {
  createBatch,
  getBatches,
  addMember,
  removeMember,
  deleteBatch
} from "../Controllers/batchController.js";

const batchRouter = express.Router();

batchRouter.get("/", getBatches);
batchRouter.post("/", createBatch);
batchRouter.post("/member", addMember);
batchRouter.delete("/member", removeMember);
batchRouter.delete("/", deleteBatch);

export default batchRouter;
