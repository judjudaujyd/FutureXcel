import React, { useState } from "react"
import "./dashboard.css"
import Sidebar from "../src/components/admin/admin_auth/admin_components/Sidebar";
import { Outlet } from "react-router-dom";
import Topmenu from "../src/components/admin/admin_auth/admin_components/Topmenu";

const Dashboard = () => {
  const [menu, setMenu] = useState(true);

  // Helper to handle responsive menu state usually managed via useEffect or simple conditional class

  return (
    <div className="dashboard">
      <div className={`dashboard_left ${menu ? "active" : ""}`}>
        <Sidebar setMenu={setMenu} menu={menu} />
      </div>
      <div className={`dashboard_right ${menu ? "active" : ""}`}>
        <Topmenu menu={menu} setMenu={setMenu} />
        <div className="dashboard_content">
          <Outlet context={{ menu, setMenu }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;