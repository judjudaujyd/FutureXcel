import { useState, useEffect } from "react";

const TaskManagement = () => {
  const [roles, setRoles] = useState([]);
  const [batches, setBatches] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const getRoles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/roles`);
      const data = await res.json();
      if (res.ok) setRoles(data.roles);
    } catch (e) {
      console.error(e.message);
    }
  };

  const getBatches = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/batches`);
      const data = await res.json();
      if (res.ok) setBatches(data.batches);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getRoles();
    getBatches();
  }, []);

  const assignTask = async () => {
    if (!taskText || !selectedRole || !selectedBatchId) return;

    await fetch(`${import.meta.env.VITE_API_URL}/tasks/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batchId: selectedBatchId,
        role: selectedRole,
        task: taskText,
      }),
    });

    setTaskText("");
    setSelectedRole("");
    getBatches();
  };

  const markDone = async (batchId, memberId) => {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/done`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId, memberId }),
    });
    getBatches();
  };

  const deleteTask = async (batchId, memberId) => {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId, memberId }),
    });
    getBatches();
  };

  const currentBatch = batches.find((b) => b._id === selectedBatchId);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Assign Task */}
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <select
          className="w-full md:w-1/3 p-2 bg-blue-50 rounded outline-none"
          value={selectedBatchId}
          onChange={(e) => setSelectedBatchId(e.target.value)}
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          className="w-full md:w-1/3 p-2 bg-blue-50 rounded outline-none"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          disabled={!currentBatch}
        >
          <option value="">Select Role</option>
          {currentBatch &&
            [...new Set(currentBatch.members.map((m) => m.role))].map(
              (r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              )
            )}
        </select>

        <input
          className="w-full md:flex-1 p-2 bg-blue-50 rounded outline-none"
          placeholder="Assign task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <button
          onClick={assignTask}
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Assign
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {batches.map((batch) => (
          <div
            key={batch._id}
            className="bg-white border border-blue-200 rounded-md p-4 space-y-3"
          >
            <h2 className="font-semibold text-lg text-blue-700 mb-2">
              {batch.name}
            </h2>

            {batch.members.map((member) => (
              <div
                key={member._id}
                className="flex justify-between items-center p-2 rounded bg-gray-50 hover:bg-blue-50 transition relative"
              >
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  {member.task && (
                    <p
                      className={`text-sm mt-1 ${
                        member.done
                          ? "text-green-600 line-through"
                          : "text-blue-700"
                      }`}
                    >
                      {member.task}
                    </p>
                  )}
                </div>

                {member.task && (
                  <div className="flex gap-2">
                    {/* Only show ✔ if not done */}
                    {!member.done && (
                      <button
                        type="button"
                        onClick={() => markDone(batch._id, member._id)}
                        className="text-green-600 hover:scale-110 transition"
                      >
                        ✔
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteTask(batch._id, member._id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      ✖
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
