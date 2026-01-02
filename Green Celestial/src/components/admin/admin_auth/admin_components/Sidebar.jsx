import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({setMenu}) => {
  const nav_btns = [
    {
      title: "TRAFFIC STATISTICS",
      path: "/dashboard/traffic",
    },
    {
      title: "BLOG MANAGMENT",
      path: "/dashboard",
    },
    {
      title: "TEAM MANAGMENT",
      path: "/dashboard/team",
    },
    {
      title: "PROJECT MANAGMENT",
      path: "/dashboard/project",
    },
    {
      title: "ACCOUNT MANAGMENT",
      path: "/dashboard/accounts",
    },
    {
      title: "MY ACCOUNT",
      path: "/dashboard/account",
    },
  ];

  return (
    <>
      <div className="admin_left" >
        <nav className="admin_nav">
          <div className="nav_top">
            <h2>
              <img src="/admin/tool.svg" loading="lazy" />
              Admin Panel
            </h2>
          </div>
          <div className="nav_btm">
            <ul>
              {nav_btns.map((val, index) => {
                return (
                  <li key={index} onClick={() => setMenu(false)}>
                    <Link to={val.path}>{val.title}</Link>
                  </li>
                );
              })}
              <li onClick={() => setMenu(false)} className="close_menu">
                <img src="/admin/close.svg" loading="lazy" />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
