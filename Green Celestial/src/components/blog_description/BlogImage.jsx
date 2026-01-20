import React from 'react'
import "./blogImage.css"
import blogDetails from '../../../Pages/zustand/BlogDetails';

import { getImageUrl } from '../../config/api';

const BlogImage = () => {
    const blogData = blogDetails((temp) => temp.blog);
    return (
        <>
            <div className="blogImage">
                <div className="blogImageInner">
                    <img src={getImageUrl(blogData.img)} alt={blogData.meta_keywords} />
                </div>
            </div>
        </>
    )
}

export default BlogImage