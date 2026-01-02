import React from "react";
import "./common.css"
import Landing from "../Pages/Landing";
import { BrowserRouter ,Route ,Routes } from "react-router-dom";
import Admin from "../Pages/Admin";
import Dashboard from "../Pages/Dashboard"
import Traffic from "./components/admin/admin_auth/admin_components/Traffic";
import AboutPage from "../Pages/AboutPage";
import Addblog from "./components/admin/admin_auth/admin_components/blog_components/Addblog";
import CreateBlog from "./components/admin/admin_auth/admin_components/blog_components/CreateBlog";
import Createcategory from "./components/admin/admin_auth/admin_components/blog_components/Createcategory";
import BlogMngmnt from "./components/admin/admin_auth/admin_components/BlogMngmnt";
import Manageblogs from "./components/admin/admin_auth/admin_components/blog_components/Manageblogs";
import UpdateBlog from "./components/admin/admin_auth/admin_components/blog_components/UpdateBlog";
import BlogPage from "../Pages/BlogPage";
import ContactPage from "../Pages/ContactPage";
import Blog from "../Pages/Blog";
import ExpPage from "../Pages/ExpPage";


const App = () => {

  const Error = () => {
    return(
      <div className="error"><h1>ERROR : PAGE NOT FOUND</h1></div>
    )
  }

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Landing/>}></Route>
          <Route path="/admin" element = {<Admin/>}></Route>
          <Route path="/about" element = {<AboutPage/>}></Route>
          <Route path="/blogs" element = {<BlogPage/>}></Route>
          <Route path="/contact" element = {<ContactPage/>}></Route>
          <Route path="/blog" element ={<Error/>}></Route>
          <Route path="/blog/:id" element={<Blog/>}></Route>
          <Route path="/exp" element={<ExpPage/>}></Route>
          <Route path="/*" element = {<Error/>}></Route>

          <Route path="/dashboard" element = {<Dashboard/>}>
            <Route index element={<BlogMngmnt/>}></Route>
            <Route path="/dashboard/blog/create" element={<Addblog/>}></Route>
            <Route path="/dashboard/blog/createBlog" element={<CreateBlog/>}></Route>
            <Route path="/dashboard/blog/createCategory" element={<Createcategory/>}></Route>
            <Route path="/dashboard/blog/manageBlogs" element={<Manageblogs/>}></Route>
            <Route path="/dashboard/blog/updateBlog/:id" element={<UpdateBlog/>}></Route>
            <Route path="/dashboard/blog/updateBlog/" element={<Manageblogs/>}></Route>
            <Route path="/dashboard/traffic" element={<Traffic/>}></Route>
          </Route>
          
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App;