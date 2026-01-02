import React from 'react'
import "./categorystrip.css"
import blogDetails from '../../../Pages/zustand/BlogDetails'

const CategoryStrip = () => {
    const blogData = blogDetails((temp) => temp.blog);

  return (
    <>
    <div className="categoryStrip">
        <div className="categoryStripInner">
            <b>Blogs / {blogData.category}</b>
        </div>
    </div>

    <div className="blogTitle">
        <div className="blogTitleInner">
            <h2>{blogData.title}</h2>
        </div>
    </div>
    </>
    )
}

export default CategoryStrip