import React from 'react';
import './blogcard.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL, { getImageUrl } from '../../../../../../config/api';

const BlogCard = ({ data, index, removeBlog }) => {
  const navigate = useNavigate();

  if (!data || !data._id) return null;

  if (!localStorage.getItem('authToken')) {
    window.location.href = '/';
  }

  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const delBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });

      if (res.ok) removeBlog(id);
      else alert("Failed to delete blog");
    } catch {
      alert("Server error");
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="blog_card_modern">

      {/* IMAGE */}
      <div className="blog_card_image">
        <img
          src={getImageUrl(data.img)}
          alt={data.title}
          loading="lazy"
        />
      </div>

      {/* HEADER */}
      <div className="blog_card_header">
        <div className="blog_title_section">
          <h3>{data.title}</h3>
          <span className="blog_category">
            {data.category || 'Uncategorized'}
          </span>
        </div>
        <div className="blog_date">
          📅 {formattedDate}
        </div>
      </div>

      {/* BODY */}
      <div className="blog_card_body">
        <p className="blog_excerpt">
          {stripHtml(data.content).slice(0, 150)}...
        </p>
      </div>

      {/* META */}
      <div className="blog_card_meta">
        <span><strong>Author:</strong> {data.author}</span>
        <span><strong>Views:</strong> {data.views || 0}</span>
      </div>

      {/* ACTIONS */}
      <div className="blog_card_actions">
        <button
          className="blog_action_btn edit_btn"
          onClick={() => navigate(`/dashboard/blog/updateBlog/${data._id}`)}
        >
          ✏️ Edit
        </button>
        <button
          className="blog_action_btn delete_btn"
          onClick={() => delBlog(data._id)}
        >
          🗑️ Delete
        </button>
      </div>

    </div>
  );
};

export default BlogCard;
