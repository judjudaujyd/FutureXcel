import React, { useEffect, useState } from "react";
import blogPageData from "../../../Pages/zustand/Blog_page";
import "./blogcategoryfilter.css";

const BlogsCategoryFilter = () => {
  const setCategoryFilter = blogPageData((state) => state.setCategoryFilter);
  const resetFilters = blogPageData((state) => state.resetFilters);
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/category");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="blogCategoryFilter">
      <div className="categoryFilterInner">
        <div className="categoryFilter">
          <div className="funnelIcon">
            <h4>Categories :</h4>
          </div>
          <ul className="category_ul">
            <li className="li_category" onClick={resetFilters}>
              All
            </li>
            {categories.map((cat, index) => (
              <li
                key={index}
                className="li_category"
                onClick={() => setCategoryFilter(cat.title)}
              >
                {decodeURIComponent(cat.title)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogsCategoryFilter;
