import React, { useState, useEffect } from 'react';
import "./topmenu.css";

const Topmenu = ({ menu, setMenu }) => {
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    // Fetch admin info from localStorage or API
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // You could decode the token or fetch user info
      // For now, using a default name
      setAdminName('Dark_Knight');
    }
  }, []);

  return (
    <div className="admin_top_menu">
      <div className="admin_menu_left">
        <button className="menu_toggle_btn" onClick={() => setMenu(!menu)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="page_title">Dashboard</h1>
      </div>
      <div className="admin_menu_right">
        <div className="admin_profile">
          <div className="profile_info">
            <span className="admin_name">{adminName}</span>
            <span className="admin_role">Administrator</span>
          </div>
          <div className="nav_profile_avatar">
            <img src="/tester.jpeg" alt="Profile" loading='lazy' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topmenu;