import React from 'react'
import "./blog_strip.css"
import blogDetails from '../../../Pages/zustand/BlogDetails';

const Blog_Strip = () => {
  const blog = blogDetails((temp) => temp.blog);
  let date = new Date(blog.date);

  return (
    <>
    <div className="blog_strip">
        <div className="blog_strip_inner">
            <p>Posted On ,<b>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</b></p>
        </div>
    </div>
    </>
    )
}

export default Blog_Strip