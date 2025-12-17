import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import TaskCard from './TaskCard/TaskCard'

const TaskScreen = () => {
  const [selectedForm, setSelectedForm] = useState(true)

  return (
    // ✅ lock screen
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-[url(/waves.svg)] bg-no-repeat bg-bottom gap-y-2">

      {/* Navbar */}
      <div className="min-h-[10vh] flex items-center justify-center">
        <Navbar />
      </div>

      {/* Header */}
      <div className="min-h-[25vh] flex items-center justify-center">
        <div className="w-9/10 h-full rounded-md bg-[var(--orange)] flex flex-col lg:flex-row">

          <div className="flex-1 flex flex-col justify-center items-center">
            <h3 className="font-bold text-2xl text-[var(--background)]">TASKS</h3>
            <p className="font-light text-md text-[var(--background)]">
              Hello Buddy! Looking For Whats Next?
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <button className="w-1/2 font-bold bg-[var(--background)] text-[var(--orange)] rounded-md">
              <b>+</b> Add Task
            </button>
          </div>

        </div>
      </div>

      {/* Filter */}
      <div className="min-h-[10vh] flex items-center justify-center">
        <div className="w-9/10 h-full bg-[var(--background)] rounded-md flex items-center justify-evenly">

          <button
            className={`w-2/5 h-3/4 rounded-md font-bold ${
              selectedForm
                ? 'bg-[var(--background)] text-[var(--orange)]'
                : 'bg-[var(--orange)] text-[var(--background)]'
            }`}
            onClick={() => setSelectedForm(false)}
          >
            PENDING
          </button>

          <img src="/switch.svg" className="w-[30px]" alt="switch" />

          <button
            className={`w-2/5 h-3/4 rounded-md font-bold ${
              selectedForm
                ? 'bg-[var(--orange)] text-[var(--background)]'
                : 'bg-[var(--background)] text-[var(--orange)]'
            }`}
            onClick={() => setSelectedForm(true)}
          >
            COMPLETED
          </button>

        </div>
      </div>

      {/* ✅ TASKS — ONLY THIS SCROLLS */}
      <div className="flex-1 max-h-1/2 flex items-center justify-center">
        <div className="w-9/10 h-full bg-[var(--blow)] overflow-y-scroll rounded-md p-3 grid place-items-center">

          {/* SCROLL CONTAINER */}
          <div className="w-9/10 max-h-full flex flex-col gap-y-4 pr-2">
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>

        </div>
      </div>

    </div>
  )
}

export default TaskScreen
  