import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";
import { Link } from "react-router-dom";
import "./recentblogs.css";

const RecentBlogs = () => {
  const [recent, setRecent] = useState([]);

  // ====================GET RECENT BLOGS TO DISPLAY============================
  const getRecentBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/recentBlogs`);
      let data = await response.json();
      setRecent(data);
    } catch (error) {
      // Error fetching recent blogs
    }
  };

  // ===============TRIGGER FOR FETCHING DATA ONLOAD=======================
  useEffect(() => {
    getRecentBlogs();
  }, []);

  // ==================CONVERT CONTENT TO CONTAINED LENGTH=================

  const stripContent = (data) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;
    if (data.length <= 100) {
      return tempDiv.innerText;
    }

    return tempDiv.innerText.substring(0, 90) + "...";
  };

  // =======================CONVERT UTC TIME TO READABLE FORMAT===================

  const UTCToNormal = (data) => {
    let tempDate = new Date(data);
    let day = tempDate.getDay();
    let month = tempDate.getMonth();
    let year = tempDate.getFullYear();

    return day + "/" + month + "/" + year;
  };

  return (
    <>
      <div className="recentBlogs">
        <div className="recentBlogsInner">
          {/* Header */}

          {/* Cards Container */}
          <div className="recentBlogsContent">
            {/* Cards */}
            {recent.map((temp) => (
              <div key={temp._id} className="recentBlogsCard">
                <Link to={`/blog/${temp._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <small>POSTED ON {UTCToNormal(temp.date)}</small>
                  <h2>{temp.title}</h2>
                  <p>{stripContent(temp.content)}</p>
                  <b>Category : {temp.category}</b>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentBlogs;
