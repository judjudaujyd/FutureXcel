import React, { useEffect, useState } from "react";
import "./recentblogs.css";

const RecentBlogs = () => {
  const [recent, setRecent] = useState([]);

  // ====================GET RECENT BLOGS TO DISPLAY============================
  const getRecentBlogs = async () => {
    const response = await fetch("http://localhost:8000/blogs/recentBlogs")
      .then((res) => res)
      .catch((error) => console.log("An Error Occured"));
    let data = await response.json();
    setRecent(data);
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
          <div className="recentBlogTitle">
            <h2>Recent Blogs</h2>
          </div>
          {/* Cards Container */}
          <div className="recentBlogsContent">
            {/* Cards */}
            {recent.map((temp) => (
              <>
                <div className="recentBlogsCard">
                  <small>POSTED ON {UTCToNormal(temp.date)}</small>
                  <h2>{temp.title}</h2>
                  <p>{stripContent(temp.content)}</p>
                  <b>Category : {temp.category}</b>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentBlogs;
