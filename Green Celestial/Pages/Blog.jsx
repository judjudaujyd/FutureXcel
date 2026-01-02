import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogDetails from './zustand/BlogDetails';
import Header from "../src/components/landing_page/Header";
import Blog_Strip from '../src/components/blog_description/Blog_Strip';
import BlogImage from '../src/components/blog_description/BlogImage';
import BlogContent from '../src/components/blog_description/BlogContent';
import CategoryStrip from '../src/components/blog_description/CategoryStrip';
import RecentBlogs from '../src/components/blog_description/RecentBlogs';

const Blog = () => {
    const { id } = useParams();
    const setBlog = blogDetails((temp) => temp.setBlog);

    const getBlog = async () => {

      const reqOpts = {
        method : "GET"
      };

      const request = await fetch(`http://localhost:8000/blogs/one/${id}`,reqOpts);
      if(request.ok){
        let response = await request.json();
        setBlog(response);
      }else{
        window.location.href ="/blogs";
      }
    }

    useEffect(() => {
      getBlog();
    },[])

  return (
    <>
    <Header/>
    <Blog_Strip/>
    <BlogImage/>
    <CategoryStrip/>
    <BlogContent/>
    <RecentBlogs/>
    </>
    )
}

export default Blog