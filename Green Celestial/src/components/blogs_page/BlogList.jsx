import React, { useEffect, useState } from "react";
import blogPageData from "../../../Pages/zustand/Blog_page";
import "./bloglist.css";
import BlogCard from "./sub_components/BlogCard";
import API_BASE_URL from "../../config/api";

const BlogList = () => {
  const setBlogsData = blogPageData((data) => data.setBlogs);
  const filteredData = blogPageData((data) => data.filteredData);
  const activeCategory = blogPageData((data) => data.activeCategory);
  const searchQuery = blogPageData((data) => data.searchQuery);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getBlogs = async () => {
    try {
      const url = new URL(`${API_BASE_URL}/blogs`);
      url.searchParams.append("page", page);
      url.searchParams.append("limit", 6);
      if (activeCategory) url.searchParams.append("category", activeCategory);
      if (searchQuery) url.searchParams.append("search", searchQuery);

      const request = await fetch(url.toString());
      if (request.ok) {
        const reqData = await request.json();
        setBlogsData(reqData.blogs);
        setTotalPages(reqData.totalPages);
      }
    } catch (e) {
      console.error("Error Retrieving Blogs", e);
    }
  };

  useEffect(() => {
    setPage(1); // reset page to 1 when filters change
    getBlogs();
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    getBlogs();
  }, [page]);

  const dataToRender = filteredData;

  return (
    <div className="blogListPage">
      <div className="blogListPageInner">
        <div className="blogListPageContainer">
          {dataToRender && dataToRender.length > 0 ? (
            dataToRender.map((val) => (
              <BlogCard data={val} key={val._id} />
            ))
          ) : (
            <p className="no_blogs_found">No blogs found matching your criteria.</p>
          )}
        </div>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
