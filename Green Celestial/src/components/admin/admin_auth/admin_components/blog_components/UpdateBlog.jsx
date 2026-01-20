import React, { useEffect, useState } from "react";
import API_BASE_URL from '../../../../../config/api';
import "./createblog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();

  // Single state object for all form inputs
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    metaDesc: "",
    metaKeywords: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  const setBlogOld = async () => {
    try {
      let res = await fetch(`${API_BASE_URL}/blogs/one/${id}`);
      if (res.ok) {
        let result = await res.json();
        setFormData(prevFormData => ({
          ...prevFormData,
          title: result.title,
          content: result.content,
          category: result.category,
          metaDesc: result.meta_desc,
          metaKeywords: result.meta_keywords,
          image: null
        }));
      }
    } catch (e) {
      console.error("ERROR PROCESSING PREVIOS DATA :", e);
    }
  };

  // Fetch categories from backend
  const getCategories = async () => {

    const catReqOpts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/category`, catReqOpts);
      const catResponse = await res.json();
      setCategories(catResponse);
    } catch (error) {
      // Error fetching categories
    }
  };

  // Handle input changes for both text inputs and file input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
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

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, content: data });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if required fields are filled
    if (!formData.title || !formData.content || !formData.category) {
      alert("Please fill all required fields and select an image.");
      return;
    }

    // Prepare form data for submission
    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("content", formData.content);
    blogData.append("category", formData.category);
    blogData.append("metaDesc", formData.metaDesc);
    blogData.append("metaKeywords", formData.metaKeywords);
    formData.image ? blogData.append("image", formData.image) : null; // Attach the image file

    // Send POST request to backend
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: "PUT",
        headers: {
          // 'auth-token': localStorage.getItem('authToken'), // Do not set Content-Type
          "auth-token": localStorage.getItem("authToken"), // Include your token
        },
        body: blogData,
      });

      if (response.ok) {
        // Blog updated successfully
        // Optionally reset form or redirect to another page
        // Reset form state
        setFormData({
          title: "",
          content: "",
          category: "",
          metaDesc: "",
          metaKeywords: "",
          image: null,
        });

        window.location.href = "/dashboard/blog/manageBlogs";
      } else {
        const errorResponse = await response.json();
        console.error("Failed to create blog", errorResponse.errors);
        alert(
          "Error creating blog: " +
          errorResponse.errors.map((err) => err.msg).join(", ")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the blog.");
    }
  };


  // const handlePageLoad = async() => {
  //   if(id){

  //     await setBlogOld();
  //     await getCategories();
  //   }
  // };

  useEffect(() => {
    // handlePageLoad();
    if (categories.length == 0) {
      getCategories();
    }


    setBlogOld();

  }, [categories]);

  return (
    <div className="createBlog">
      <div className="createBlogInner">
        <h2>UPDATE BLOG</h2>
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
          <input type="file" id="image" name="image" onChange={handleChange} />

          <label htmlFor="content">Content</label>
          <CKEditor
            id="content"
            name="content"
            editor={ClassicEditor}
            data={formData.content}
            onChange={handleContentChange}
          ></CKEditor>

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option>Select a Category</option>
            {categories.map((val, index) => (
              val.title == formData.category ? <option value={val.title} key={index} default>{val.title}</option> : <option value={val.title} key={index}>{val.title}</option>
            ))}
          </select>

          <label htmlFor="metaDesc">
            Meta Description{" "}
            <span>(Description For Search Engines / Web Crawlers)</span>
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
            Meta Keywords{" "}
            <span>(Keywords For Search Engines / Web Crawlers)</span>
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

export default UpdateBlog;
