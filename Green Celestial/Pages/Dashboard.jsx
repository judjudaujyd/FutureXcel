import React, {useState } from "react"
import "./dashboard.css"
import Sidebar from "../src/components/admin/admin_auth/admin_components/Sidebar";
import { Outlet } from "react-router-dom";
import Topmenu from "../src/components/admin/admin_auth/admin_components/Topmenu";

const Dashboard = () => {
  const [menu,setMenu] = useState(true);
  
  const mobActive = () => {
    if(window.innerWidth <= 800){
      return false;
    }else{
      return true;
    }
  }


  return(
    <>
    <div className="dashboard">
      <div className="dashboard_left" style={{left : menu == true ? "0%" : "-80%"}}>
        <Sidebar setMenu={setMenu}/>
      </div>
      <div className="dashboard_right"style={{width : menu == true && mobActive() ? "70%" : "100%"}}>
        <Topmenu menu={menu} setMenu={setMenu}/>
        <Outlet menu={menu} setMenu={setMenu}/>
      </div>
    </div>
    </>
  )
}

export default Dashboard;