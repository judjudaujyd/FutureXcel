import React, { useEffect } from "react";
import "./blogcontent.css";
import blogDetails from "../../../Pages/zustand/BlogDetails";

const BlogContent = () => {
    const blogData = blogDetails((temp) => temp.blog);

    //==============Setting Content In The blogContentInner Div==================

    const setContent = () => {
        if(blogData.content){
        document.querySelector(".blogContentInner").innerHTML = blogData.content;
        }
    }

    useEffect(() => {
        setContent();
    })


    return(
        <>
        <div className="blogContent">
            <div className="blogContentInner">
            </div>
        </div>
        </>
    )
}

export default BlogContent