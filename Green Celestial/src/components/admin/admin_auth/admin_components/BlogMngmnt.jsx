import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import "./blogmngmnt.css";

const BlogMngmnt = () => {
  // Memoize blog sections to prevent unnecessary re-renders
  const blogSections = useMemo(() => [
    ["View Statistics", "/admin/blog/stats.jpg", "dashboard/blog/create"],
    ["View And Manage Blogs", "/admin/blog/view.jpg", "/dashboard/blog/manageBlogs"],
    ["Create A Blog", "/admin/blog/create.jpg", "/dashboard/blog/create"],
  ], []);

  return (
    <div className="blog_mngt">
      <div className="blog_mngt_inner">
        {blogSections.map((val, index) => (
          <div className="blog_mngt_card" key={index}>
            <Link to={val[2]}>
              <img
                src={val[1]}
                alt={val[0]}
                loading="lazy"
                width="100%"
                height="280"
              />
              <h3>{val[0]}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the memoized component
export default memo(BlogMngmnt);
