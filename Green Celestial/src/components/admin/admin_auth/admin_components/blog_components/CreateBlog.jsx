import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import API_BASE_URL from '../../../../../config/api';
import './createblog.css';

const CreateBlog = () => {
  // Single state object for all form inputs
  const [formData, setFormData] = useState({
    title: '',
    content: '',  // Ensure this stores the HTML string properly
    category: '',
    metaDesc: '',
    metaKeywords: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);

  const catReqOpts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('authToken'),
    },
  };

  // Fetch categories from backend
  const getCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/category`, catReqOpts);
      const catResponse = await res.json();
      setCategories(catResponse);
    } catch (error) {
      // Error fetching categories
    }
  };

  useEffect(() => {
    getCategories();

    setFormData({
      title: '',
      content: '',
      category: '',
      metaDesc: '',
      metaKeywords: '',
      image: null,
    });
  }, []);

  // Handle input changes for both text inputs and file input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // Save file input for image
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Save text input values
      });
    }
  };

  // Handle CKEditor content change
  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      content: data,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if required fields are filled
    if (!formData.title || !formData.content || !formData.category || !formData.image) {
      alert('Please fill all required fields and select an image.');
      return;
    }

    // Prepare form data for submission
    const blogData = new FormData();
    blogData.append('title', formData.title);
    blogData.append('content', formData.content); // This should contain HTML
    blogData.append('category', formData.category);
    blogData.append('metaDesc', formData.metaDesc);
    blogData.append('metaKeywords', formData.metaKeywords);
    blogData.append('image', formData.image); // Attach the image file

    // Send POST request to backend
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/`, {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('authToken'), // Include your token
        },
        body: blogData,
      });

      if (response.ok) {
        // Blog created successfully
        // Reset form state
        setFormData({
          title: '',
          content: '',
          category: '',
          metaDesc: '',
          metaKeywords: '',
          image: null,
        });

        window.location.href = '/dashboard/blog/manageBlogs';
      } else {
        const errorResponse = await response.json();
        console.error('Failed to create blog', errorResponse.errors);
        alert('Error creating blog: ' + errorResponse.errors.map(err => err.msg).join(', '));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the blog.');
    }
  };

  return (
    <div className="createBlog">
      <div className="createBlogInner">
        <h2>CREATE A BLOG</h2>
        <small>This Web Is Developed & Designed By Dark_Knight</small>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="ENTER BLOG TITLE HERE..."
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="image">Featured Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />

          <label htmlFor="content">Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.content} // Load initial content if available
            onChange={handleContentChange} // Store content changes in state
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((val, index) => (
              <option value={val.title} key={index}>
                {val.title}
              </option>
            ))}
          </select>

          <label htmlFor="metaDesc">
            Meta Description <span>(Description For Search Engines / Web Crawlers)</span>
          </label>
          <input
            type="text"
            id="metaDesc"
            name="metaDesc"
            placeholder="ENTER META DESC HERE..."
            value={formData.metaDesc}
            onChange={handleChange}
          />

          <label htmlFor="metaKeywords">
            Meta Keywords <span>(Keywords For Search Engines / Web Crawlers)</span>
          </label>
          <input
            type="text"
            id="metaKeywords"
            name="metaKeywords"
            placeholder="ENTER META KEYWORDS HERE..."
            value={formData.metaKeywords}
            onChange={handleChange}
          />

          <button type="submit">CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
