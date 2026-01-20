import React from "react";
import "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ setMenu, menu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin");
  };

  const nav_sections = [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", path: "/dashboard", icon: "🏠" },
        { title: "Analytics", path: "/dashboard/blog-stats", icon: "📊" }
      ]
    },
    {
      title: "Content",
      items: [
        { title: "Blog Management", path: "/dashboard/blog/manageBlogs", icon: "📝" },
        { title: "Project Management", path: "/dashboard/project", icon: "💼" },
        { title: "Team Management", path: "/dashboard/team", icon: "👥" }
      ]
    },
    {
      title: "Create",
      items: [
        { title: "New Blog", path: "/dashboard/blog/create", icon: "✍️" },
        { title: "New Project", path: "/dashboard/project/add", icon: "🚀" }
      ]
    },
    {
      title: "Settings",
      items: [
        { title: "My Account", path: "/dashboard/account", icon: "👤" },
        { title: "Account Management", path: "/dashboard/accounts", icon: "⚙️" },
        { title: "Traffic Stats", path: "/dashboard/traffic", icon: "📈" }
      ]
    }
  ];

  return (
    <div className="admin_sidebar">
      <div className="sidebar_header">
        <div className="brand_logo">🌿</div>
        <h2>Green Celestial</h2>
        <p>Admin Dashboard</p>
      </div>

      <nav className="sidebar_nav">
        {nav_sections.map((section, idx) => (
          <div key={idx} className="nav_section">
            <h3 className="section_title">{section.title}</h3>
            <ul>
              {section.items.map((item, index) => (
                <li key={index} onClick={() => {
                  if (window.innerWidth < 968) {
                    setMenu(false);
                  }
                }}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? "active" : ""}
                  >
                    <span className="nav_icon">{item.icon}</span>
                    <span className="nav_text">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar_footer">
        <button className="logout_btn" onClick={handleLogout}>
          <span className="nav_icon">🚪</span>
          <span className="nav_text">Logout</span>
        </button>
      </div>

      <button className="close_sidebar_btn" onClick={() => setMenu(false)}>
        ✕
      </button>
    </div>
  );
};

export default Sidebar;
