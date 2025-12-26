import batchModel from "../Models/batchModel.js";

const assignTask = async (req, res) => {
  const { role, batchId, task } = req.body;

  try {
    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    const assignedTo = 0;

    batch.members.forEach(member => {
      if (member.role === role) {
        member.task = task;
        member.done = false;
        assignedTo++;
      }
    });

    await batch.save();

    res.status(200).json({
      success: "Task assigned",
      assignedTo: assignedCount
    });

  } catch (e) {
    console.error("Error Assigning Tasks:", e.message);
    res.status(400).json({ error: e.message });
  }
};

const markAsDone = async (req, res) => {
  try {
    const { batchId, memberId } = req.body;

    const batch = await batchModel.findById(batchId);
    if (!batch)
      return res.status(404).json({ error: "Batch not found" });

    const member = batch.members.id(memberId);
    if (!member)
      return res.status(404).json({ error: "Member not found" });

    member.done = true;
    await batch.save();

    res.status(200).json({ success: "Task marked as done" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error marking task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { batchId, memberId } = req.body;

    const batch = await batchModel.findById(batchId);
    if (!batch)
      return res.status(404).json({ error: "Batch not found" });

    const member = batch.members.id(memberId);
    if (!member)
      return res.status(404).json({ error: "Member not found" });

    member.task = null;
    member.done = false;

    await batch.save();

    res.status(200).json({ success: "Task deleted" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: "Error deleting task" });
  }
};



export { assignTask , markAsDone , deleteTask };
