import batchModel from "../Models/batchModel.js";

/* ================= CREATE batchModel ================= */
const createBatch = async (req, res) => {
  console.log(req.body);
  try {
    const batch = await batchModel.create({ name: req.body.name });
    res.status(200).json({ success: batch });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error creating batch" });
  }
};

/* ================= GET ALL BATCHES ================= */
const getBatches = async (req, res) => {
  try {
    const batches = await batchModel.find();
    res.status(200).json({ batches });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error fetching batches" });
  }
};

/* ================= ADD MEMBER ================= */
const addMember = async (req, res) => {
  try {
    const { batchId, name, role } = req.body;

    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    batch.members.push({ name, role });
    await batch.save();

    res.status(200).json({ success: "Member added" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error adding member" });
  }
};

/* ================= REMOVE MEMBER ================= */
const removeMember = async (req, res) => {
  try {
    const { batchId, name } = req.body;

    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    batch.members = batch.members.filter(m => m.name !== name);
    await batch.save();

    res.status(200).json({ success: "Member removed" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error removing member" });
  }
};

/* ================= DELETE BATCH ================= */
const deleteBatch = async (req, res) => {
  try {
    await batchModel.deleteOne({ _id: req.body.batchId });
    res.status(200).json({ success: "Batch deleted" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error deleting batch" });
  }
};

export {
  createBatch,
  getBatches,
  addMember,
  removeMember,
  deleteBatch
};
