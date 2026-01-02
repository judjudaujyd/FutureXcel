import React from "react";

const TaskCard = ({ data, deleteTask, markTask, setUpdateTaskData }) => {
  const { task, dueDate } = data;
  const id = data._id;

  // Calculate days remaining
  const getPendingDays = (dueDate, fromDate = null) => {
    const start = fromDate ? new Date(fromDate) : new Date();
    const end = new Date(dueDate);
    const diffMs = end - start;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="w-full h-auto !my-2 lg:h-[15vh] bg-[var(--background)] rounded-md flex flex-col lg:flex-row shadow-md gap-y-2 outline-1 outline-[var(--orange)] hover:outline-2">
      
      {/* Due Date Section */}
      <div className="w-full h-[12vh] lg:w-1/5 lg:h-full flex flex-col lg:flex-row mt-[8px!important] lg:m-0">
        <div className="w-full lg:w-1/2 grid place-items-center">
          <img src="/date.svg" className="w-[32px]" alt="Date" />
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center lg:items-start text-xs">
          <b className="opacity-80 text-[var(--text)] text-center">Due Date: <br /> {dueDate}</b>
          <b className="opacity-70 text-[var(--text)] text-center">
            Days Remaining : <br /> {getPendingDays(dueDate)}
          </b>
        </div>
      </div>

      {/* Task Info Section */}
      <div className="w-full h-auto lg:w-3/5 lg:h-full flex flex-col">
        <div className="w-full h-[5vh] lg:h-1/5 grid place-items-center">
          <div className="h-7/10 w-6/12 lg:w-2/12 flex items-center gap-1 p-[0px 8px!important] rounded-2xl bg-[var(--orange)] justify-evenly">
            <img src="/pending.svg" className="w-[16px]" alt="Pending" />
            <b className="text-xs text-[var(--text)]">Pending</b>
          </div>
        </div>
        <div className="w-full h-auto lg:h-4/5">
          <p className="text-sm p-[8px!important] text-center text-[var(--text)]">{task}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full h-[10vh] lg:w-1/5 lg:h-full flex justify-evenly items-center">
        <button
          className="transition-all duration-300 outline-[var(--orange)] text-xs outline-2 bg-[var(--orange)] text-[var(--text)] font-bold p-[8px!important] rounded-md hover:bg-[var(--background)] hover:text-[var(--orange)] cursor-pointer"
          onClick={() => markTask(id)}
        >
          Mark Completed
        </button>

        <button
          className="transition-all duration-300 outline-[var(--orange)] text-xs outline-2 bg-[var(--orange)] text-[var(--text)] font-bold p-[8px!important] rounded-md hover:bg-[var(--background)] hover:text-[var(--orange)] cursor-pointer"
          onClick={() => setUpdateTaskData(data)}
        >
          Update
        </button>

        <button
          className="w-[32px] transition-all duration-300 outline-[var(--orange)] outline-2 bg-[var(--orange)] text-[var(--background)] font-bold p-[8px!important] rounded-md hover:opacity-70 cursor-pointer"
          onClick={() => deleteTask(id)}
        >
          <img src="/trash.svg" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
