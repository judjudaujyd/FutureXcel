// TaskModel
import taskModel from "../Models/taskModel.js";

// FUNCTION FOR RETRIVING A TASK
const getTasks = async (req, res) => {
  // RETRIVING DATA FROM DB
  try {
    const taskList = await taskModel.find();
    console.log("tasks - Get Sucess [taskController.js:11]");
    res.status(200).json({ sucess: taskList });
  } catch (e) {
    console.error(
      e.message,
      " Error Retriving Data From DB - tasksController.js:14"
    );
    res.status(400).json({ error: "Error Retriving Data" });
  }
};

// FUNCTION FOR ADDING A TASK
const addTask = async (req, res) => {
  // UNPACKING REQUEST DATA
  const { task, dueDate } = req.body;

  // Defing Payload That Is To Be Saved
  const taskPayload = {
    task: task,
    dueDate: dueDate,
    status: false,
  };

  // PUSHING DATA INTO DATABASE
  try {
    await taskModel.create(taskPayload);
    console.log("Task Saved Succesfully!");
    res.status(200).json({ sucess: "Task Saved,Go Back And Continue" });
  } catch (e) {
    console.error(
      e.message,
      "Error Setting Task Into Database - taskController.js:26"
    );
    res.status(400).json({ error: "Error Saving Data To Database" });
  }
};

// FUNCTION FOR REMOVING A TASK
const removeTask = async (req, res) => {
  console.log("requested Delete");
  const { id } = req.body;

  try {
    const deletedTask = await taskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task Not Found" });
    }

    console.log("Task Deleted Successfully!");
    res.status(200).json({ success: "Task Removed" });
  } catch (e) {
    console.error(e.message, "Error Removing Task - taskController.js");
    res.status(400).json({ error: "Error Removing Task" });
  }
};

// FUNCTION FOR UPDATING A TASK
const updateTask = async (req, res) => {
  const { id } = req.body;
  const { task, dueDate } = req.body;
  const status = false;

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { task, dueDate, status },
      { new: true } // returns updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task Not Found" });
    }

    console.log("Task Updated Successfully!");
    res.status(200).json({ success: updatedTask });
  } catch (e) {
    console.error(e.message, "Error Updating Task - taskController.js");
    res.status(400).json({ error: `Error Updating Task - ${e.message}` });
  }
};

// MARK AS COMPLEATED
const markCompleated = async (req,res) => {
  const { id } = req.body;
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { status : true },
      { new: true } // returns updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task Not Found" });
    }

    console.log("Task Marked Updated Successfully!");
    res.status(200).json({ success: updatedTask });
  } catch (e) {
    console.error(e.message, "Error Marking Task - taskController.js");
    res.status(400).json({ error: "Error Marking Task" });
  }
};

export { getTasks, addTask, removeTask, updateTask ,markCompleated};
