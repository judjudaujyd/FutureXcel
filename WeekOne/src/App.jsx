import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  // Local States For Inputs And Data Rendering
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [records, setRecords] = useState([]);

  // Feedback Messages
  const [msg, setMsg] = useState("");

  // Backend Base URL
  const API = "http://localhost:8000/health";

  // Fetching All Health Records From Server
  const loadRecords = async () => {
    try {
      const res = await axios.get(API);
      setRecords(res.data.msg);
    } catch (error) {
      setMsg("Unable To Load Records");
    }
  };

  // Run On Startup
  useEffect(() => {
    loadRecords();
  }, []);

  // Creating A New Health Record
  const pushRecord = async () => {

    // Basic Client Validations Before Hitting Server
    if (title.trim().length < 8) {
      setMsg("Title Must Be At Least 8 Characters");
      return;
    }
    if (content.trim().length < 1) {
      setMsg("Content Cannot Be Empty");
      return;
    }

    try {
      await axios.post(API, { title, content });

      // Reset Form
      setTitle("");
      setContent("");

      setMsg("Record Added Successfully");
      loadRecords();

    } catch (err) {
      setMsg("Error Submitting Record");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">

      {/* Main Title */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Health Records Dashboard
      </h1>

      {/* Feedback Message */}
      {msg && (
        <div className="w-full max-w-lg bg-blue-200 p-3 rounded text-blue-900 text-sm shadow">
          {msg}
        </div>
      )}

      {/* Input Form */}
      <div className="w-full max-w-lg mt-6 p-6 bg-white shadow-lg rounded-2xl border">
        
        <h2 className="text-xl font-semibold mb-4">Create New Record</h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Record Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />

        {/* Content Input */}
        <textarea
          placeholder="Record Content"
          value={content}
          rows={5}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />

        {/* Submit Button */}
        <button
          onClick={pushRecord}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
        >
          Save Record
        </button>
      </div>

      {/* Display Records */}
      <div className="w-full max-w-3xl mt-10">

        <h2 className="text-2xl font-semibold mb-4">Saved Records</h2>

        {/* Show Message If List Is Empty */}
        {records.length === 0 && (
          <p className="text-gray-600">No Records Found</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {records.map((rec) => (
            <div
              key={rec._id}
              className="p-5 bg-white rounded-2xl shadow border hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold mb-1">{rec.title}</h3>
              <p className="text-gray-700 mb-3">{rec.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(rec.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default App;
