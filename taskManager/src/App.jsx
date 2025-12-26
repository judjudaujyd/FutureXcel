import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RoleManagment from "./components/Role/RoleManagment";
import BatchManagment from "./components/Batch/BatchManagment";
import TaskManagment from "./components/Task/TaskManagment";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<RoleManagment />} />
          <Route path="/batch" element={<BatchManagment/>} />
          <Route path="/task" element={<TaskManagment/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
