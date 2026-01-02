import React from "react";
import Header from "../src/components/landing_page/Header";
import BlogsLandingPage from "../src/components/blogs_page/BlogsLandingPage";
import BlogsCategoryFilter from "../src/components/blogs_page/BlogsCategoryFilter";
import BlogList from "../src/components/blogs_page/BlogList";

const BlogPage = () => {
    return(
        <>
        <Header/>
        <BlogsLandingPage/>
        <BlogsCategoryFilter/>
        <BlogList/>
        </>
    )
}

export default BlogPage;