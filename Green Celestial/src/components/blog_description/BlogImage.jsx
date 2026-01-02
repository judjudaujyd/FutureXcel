import React from 'react'
import "./blogImage.css"
import blogDetails from '../../../Pages/zustand/BlogDetails';

const BlogImage = () => {
    const blogData = blogDetails((temp) => temp.blog);    
  return (
    <>
        <div className="blogImage">
            <div className="blogImageInner">
                <img src={`../../../backend/uploads/${blogData.img}`} alt={blogData.meta_keywords} />
            </div>
        </div>
    </>
    )
}

export default BlogImage