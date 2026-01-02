import React from "react";
import "./blogslandingpaage.css";
import blogPageData from '../../../Pages/zustand/Blog_page'

const BlogsLandingPage = () => {
  const filterTitle = blogPageData((state) => state.filterTitle);

  const searchBlog = () => {
    const val = document.querySelector(".search_input").value;
    filterTitle(val);
  };

  // Optional: search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchBlog();
  };

  return (
    <div className="blogsMainDiv">
      <div className="blogMainInner">
        <div className="blogSearchArea">
          <input
            type="text"
            placeholder="Search Blogs Here"
            className="search_input"
            onKeyPress={handleKeyPress}
          />
          <button onClick={searchBlog}>SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default BlogsLandingPage;
