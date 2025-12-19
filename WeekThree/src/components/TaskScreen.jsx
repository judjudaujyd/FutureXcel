import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import TaskCard from "./TaskCard/TaskCard";

const TaskScreen = () => {
  // --------------------
  // STATE VARIABLES
  // --------------------
  const [tasks, setTasks] = useState([]); // list of tasks
  const [selectedForm, setSelectedForm] = useState(false); // false: PENDING, true: COMPLETED
  const [layout, setLayout] = useState(false); // toggle add/update form
  const [submitTaskStatus, setSubmitTaskStatus] = useState(null); // status messages
  const [updateTaskData, setUpdateTaskData] = useState(null); // task to update

  // --------------------
  // FETCH TASKS
  // --------------------
  const getTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
      const data = await response.json();

      if (!response.ok) console.error("Error retrieving tasks");
      setTasks(data.sucess);
    } catch (e) {
      console.error("Error retrieving tasks -", e.message);
    }
  };

  // Fetch tasks on mount and whenever a task is added/updated/deleted
  useEffect(() => {
    getTasks();
  }, [submitTaskStatus]);

  // --------------------
  // ADD NEW TASK
  // --------------------
  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      task: form.get("task"),
      dueDate: form.get("dueDate"),
      status: false,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) console.error("Error adding task");
      setSubmitTaskStatus(data.sucess);
      setLayout(false); // hide add form after submission
    } catch (e) {
      console.error("Error posting task -", e.message);
    }
  };

  // --------------------
  // UPDATE TASK
  // --------------------
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!updateTaskData) return;

    const form = new FormData(e.target);
    const payload = {
      id: updateTaskData._id,
      task: form.get("task"),
      dueDate: form.get("dueDate"),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/update`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) console.error("Error updating task");
      setSubmitTaskStatus(data.sucess);
      getTasks();
      setUpdateTaskData(null);
    } catch (e) {
      console.error("Error updating task -", e.message);
    }
  };

  // --------------------
  // DELETE TASK
  // --------------------
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id: taskId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) console.error("Error deleting task");
      getTasks();
    } catch (e) {
      console.error("Error deleting task -", e.message);
    }
  };

  // --------------------
  // MARK TASK COMPLETE
  // --------------------
  const markTask = async (taskId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/mark`, {
        method: "POST",
        body: JSON.stringify({ id: taskId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) console.error("Error marking task");
      getTasks();
    } catch (e) {
      console.error("Error marking task -", e.message);
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: "url('/waves.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
    >
      {/* MAIN LAYOUT */}
      <div
        className={`absolute h-full w-full top-0 left-0 flex flex-col gap-y-2 transition-all duration-300 ${
          layout ? "z-0 opacity-0 hidden" : "z-10 opacity-100 block"
        }`}
      >
        {/* Navbar */}
        <div className="min-h-[10vh] flex items-center justify-center">
          <Navbar />
        </div>

        {/* Header */}
        <div className="min-h-[25vh] flex items-center justify-center">
          <div className="w-9/10 h-full rounded-md bg-[var(--orange)] flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col justify-center items-center">
              <h3 className="font-bold text-2xl text-[var(--text)]">TASKS</h3>
              <p className="font-light text-md text-[var(--text)]">
                Hello Buddy! Looking For Whats Next?
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <button
                className="w-1/2 !p-2 font-bold bg-[var(--background)] text-[var(--text)] rounded-md"
                onClick={() => setLayout(true)}
              >
                <b>+</b> Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="min-h-[10vh] flex items-center justify-center">
          <div className="w-9/10 h-full bg-[var(--background)] rounded-md flex items-center justify-evenly">
            <button
              className={`w-2/5 h-3/4 rounded-md font-bold outline-1 outline-[var(--orange)] ${
                selectedForm
                  ? "bg-[var(--background)] text-[var(--orange)]"
                  : "bg-[var(--orange)] text-[var(--text)]"
              }`}
              onClick={() => setSelectedForm(false)}
            >
              PENDING
            </button>
            <img src="/switch.svg" className="w-[30px]" alt="switch" />
            <button
              className={`w-2/5 h-3/4 rounded-md font-bold outline-1 outline-[var(--orange)] ${
                selectedForm
                  ? "bg-[var(--orange)] text-[var(--text)]"
                  : "bg-[var(--background)] text-[var(--orange)]"
              }`}
              onClick={() => setSelectedForm(true)}
            >
              COMPLETED
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 max-h-1/2 flex items-center justify-center">
          <div className="w-9/10 h-full bg-[var(--blow)] overflow-y-scroll rounded-md p-3 grid place-items-center">
            <div className="w-9/10 h-auto flex flex-col gap-y-4 pr-2">
              {tasks
                .filter((data) => data.status === selectedForm)
                .map((data, i) => (
                  <TaskCard
                    key={i}
                    data={data}
                    deleteTask={deleteTask}
                    markTask={markTask}
                    setUpdateTaskData={setUpdateTaskData} // optional: set task for update
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ADD TASK FORM */}
      {layout && !updateTaskData && (
        <div className="w-full h-[90vh] absolute top-[10vh] bg-[var(--background)] left-0 grid place-items-center transition-all duration-300 z-10 opacity-100 block">
          <div className="w-9/10 h-9/10 bg-[var(--orange)] rounded-md grid place-items-center">
            <form
              className="w-9/10 h-9/10 flex flex-col justify-center items-center gap-y-2"
              onSubmit={handleAddTask}
            >
              {/* Status message */}
              {submitTaskStatus && (
                <p className="text-xs font-bold text-[var(--text)]">{submitTaskStatus}</p>
              )}

              <label htmlFor="task" className="w-9/10 font-bold text-[var(--text)]">
                Enter Task
              </label>
              <textarea
                id="task"
                name="task"
                placeholder="What do you need to do?"
                required
                className="w-9/10 !px-3 !py-2 transition-all duration-300 rounded-md outline-2 outline-[var(--blow)] focus:outline-[var(--background)] bg-[var(--text)] font-medium resize-none"
              ></textarea>

              <label htmlFor="dueDate" className="w-9/10 font-bold text-[var(--text)]">
                Due Date
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                required
                min={new Date().toISOString().slice(0, 16)}
                className="w-9/10 bg-[var(--text)] !px-3 !py-2 border-none outline-none rounded-md font-medium outline-2 outline-[var(--blow)] focus:outline-[var(--background)]"
              />

              <div className="w-9/10 flex gap-x-2 mt-2">
                <button
                  type="button"
                  className="w-1/3 bg-[var(--background)] text-[var(--text)] !px-2 !py-2 rounded-md"
                  onClick={() => setLayout(false)}
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[var(--background)] text-[var(--text)] !px-2 !py-2 rounded-md"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE TASK FORM */}
      {!layout && updateTaskData && (
        <div className="w-full h-[90vh] absolute top-[10vh] bg-[var(--background)] left-0 grid place-items-center transition-all duration-300 z-10 opacity-100 block">
          <div className="w-9/10 h-9/10 bg-[var(--orange)] rounded-md grid place-items-center">
            <form
              className="w-9/10 h-9/10 flex flex-col justify-center items-center gap-y-2"
              onSubmit={handleUpdateTask}
            >
              <p className="text-xs font-bold text-[var(--text)]">Update Task</p>

              <label htmlFor="updateTask" className="w-9/10 font-bold text-[var(--text)]">
                Task
              </label>
              <textarea
                id="updateTask"
                name="task"
                required
                defaultValue={updateTaskData.task}
                className="w-9/10 !px-3 !py-2 transition-all duration-300 rounded-md outline-2 outline-[var(--blow)] focus:outline-[var(--background)] bg-[var(--text)] font-medium resize-none"
              ></textarea>

              <label htmlFor="updateDueDate" className="w-9/10 font-bold text-[var(--text)]">
                Due Date
              </label>
              <input
                type="datetime-local"
                id="updateDueDate"
                name="dueDate"
                required
                defaultValue={updateTaskData.dueDate.slice(0,16)}
                className="w-9/10 bg-[var(--text)] !px-3 !py-2 border-none outline-none rounded-md font-medium outline-2 outline-[var(--blow)] focus:outline-[var(--background)]"
              />

              <div className="w-9/10 flex gap-x-2 mt-2">
                <button
                  type="button"
                  className="w-1/3 bg-[var(--background)] text-[var(--text)] !px-2 !py-2 rounded-md"
                  onClick={() => {
                    setUpdateTaskData(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[var(--background)] text-[var(--text)] !px-2 !py-2 rounded-md"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskScreen;
