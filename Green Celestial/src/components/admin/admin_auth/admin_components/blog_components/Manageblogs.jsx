import React, { useEffect, useState } from "react";
import API_BASE_URL from '../../../../../config/api';
import "./manageblogs.css";
import BlogCard from "./sub_components/BlogCard";
import adminBlogs from "../../../../../../Pages/zustand/Admin_blogs";
import { Link } from "react-router-dom";

const Manageblogs = () => {
  const setAdminBlogs = adminBlogs((temp) => temp.setBlogs);
  const adminBlogsData = adminBlogs((temp) => temp.blogs);
  const adminBlogRemove = adminBlogs((temp) => temp.removeBlog);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const reqOpts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getBlogs = async () => {
    setLoading(true);
    try {
      const request = await fetch(
        `${API_BASE_URL}/blogs?page=${page}&limit=6`,
        reqOpts
      );

      if (request.ok) {
        const data = await request.json();
        setAdminBlogs(data.blogs);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page]);

  return (
    <div className="manage_blogs_container">
      <div className="manage_blogs_header">
        <div>
          <h1>Blog Management</h1>
          <p>View, edit, and manage all your blog posts</p>
        </div>
        <Link to="/dashboard/blog/create" className="create_blog_btn">
          + Create New Blog
        </Link>
      </div>

      {loading ? (
        <div className="loading_state">Loading blogs...</div>
      ) : adminBlogsData.length === 0 ? (
        <div className="empty_state">
          <div className="empty_icon">📝</div>
          <h3>No blogs yet</h3>
          <p>Create your first blog post to get started</p>
          <Link to="/dashboard/blog/create" className="empty_cta_btn">
            Create Blog
          </Link>
        </div>
      ) : (
        <>
          <div className="blogs_grid">
            {adminBlogsData.map((val, index) => (
              <BlogCard
                data={val}
                key={index}
                getBlogs={getBlogs}
                removeBlog={adminBlogRemove}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination_controls">
            <button
              className="pagination_btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ← Previous
            </button>

            <span className="pagination_info">
              Page {page} of {totalPages}
            </span>

            <button
              className="pagination_btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Manageblogs;
