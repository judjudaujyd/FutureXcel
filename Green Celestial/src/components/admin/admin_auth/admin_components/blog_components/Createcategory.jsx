import React, { useState, useEffect } from 'react';
import "./createcategory.css";
import { Link } from 'react-router-dom';

const Createcategory = () => {

  // Check if the user is authenticated on component mount
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      window.location.href = "/";
    }
  }, []); // Empty dependency array means it runs only once on mount

  const [data, setData] = useState({
    title: "",
    desc: ""
  });

  const [resResult, setResResult] = useState({
    msg: "",
    error: ""
  });

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitCategory = async (e) => {
    e.preventDefault();

    const headerOpts = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem('authToken')
      },
      body: JSON.stringify({
        categoryName: escape(data.title.trim()),
        categoryDesc: escape(data.desc.trim())
      })
    };

    try {
      const response = await fetch("http://localhost:8000/category", headerOpts);
      const result = await response.json();

      setResResult({
        msg: result.msg || "",
        error: result.error || ""
      });

      showData();
    } catch (error) {
      console.error("Internal Server Error:", error);
    }
  };

  const showData = () => {
    const temp_div = document.querySelector(".showRes");
    temp_div.classList.add("visible");
    setTimeout(() => {
      temp_div.classList.remove("visible");
      temp_div.innerHTML = '';
    }, 5000);
  };

  return (
    <>
      <div className="blogCategory">
        <div className="blogCategoryInner">
          <h2>Create A Category</h2>
          <small>This Web Is Developed & Designed By Dark_Knight</small>

          <ul className='showRes'>
            {
              resResult.msg && (
                Array.isArray(resResult.msg)
                  ? resResult.msg.map((val, index) => <li key={index}>{val}</li>)
                  : <li>{resResult.msg}</li>
              )
            }
            {
              resResult.error && (
                Array.isArray(resResult.error)
                  ? resResult.error.map((val, index) => <li key={index} className='negative'>{val.msg || val}</li>)
                  : <li className='negative'>{resResult.error}</li>
              )
            }
          </ul>

          <form onSubmit={submitCategory}>
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              required
              id='categoryName'
              value={data.title}
              name='title'
              onChange={handleData}
            />

            <label htmlFor="categoryDesc">Category Desc</label>
            <textarea
              type="text"
              required
              id='categoryDesc'
              value={data.desc}
              name='desc'
              onChange={handleData}
            />

            <button type='submit'>CREATE</button>
            <Link to={"/dashboard/blog/create"} className='back_btn'>Go Back ?</Link>
          </form>
          
        </div>
      </div>
    </>
  );
};

export default Createcategory;
