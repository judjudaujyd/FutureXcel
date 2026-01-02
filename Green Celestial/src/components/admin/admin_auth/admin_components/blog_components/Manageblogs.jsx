import React, { useEffect, useState } from "react";
import "./manageblogs.css";
import BlogCard from "./sub_components/BlogCard";
import adminBlogs from "../../../../../../Pages/zustand/Admin_blogs";

const Manageblogs = () => {

  const setAdminBlogs = adminBlogs((temp) => temp.setBlogs);
  const adminBlogsData = adminBlogs((temp) => temp.blogs);
  const adminBlogRemove = adminBlogs((temp) => temp.removeBlog);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const reqOpts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getBlogs = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/blogs?page=${page}&limit=6`,
        reqOpts
      );

      if (request.ok) {
        const data = await request.json();
        setAdminBlogs(data.blogs);
        setTotalPages(data.totalPages);
      } else {
        console.log("Error Processing Request");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page]);

  return (
    <div className="adminBlogs">
      <div className="adminBlogsInner">

        {adminBlogsData.map((val, index) => (
          <BlogCard
            data={val}
            key={index}
            getBlogs={getBlogs}
            removeBlog={adminBlogRemove}
          />
        ))}

        {/* ============ PAGINATION ============ */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>{page} / {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Manageblogs;
