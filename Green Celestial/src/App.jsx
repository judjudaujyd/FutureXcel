import React, { Suspense, lazy } from "react";
import "./common.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load components
const Landing = lazy(() => import("../Pages/Landing"));
const Admin = lazy(() => import("../Pages/Admin"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
// const Traffic = lazy(() => import("./components/admin/admin_auth/admin_components/Traffic")); // Keep core dashboard comp loaded or lazy load
const Traffic = lazy(() => import("./components/admin/admin_auth/admin_components/Traffic"));
const AboutPage = lazy(() => import("../Pages/AboutPage"));
const Addblog = lazy(() => import("./components/admin/admin_auth/admin_components/blog_components/Addblog"));
const CreateBlog = lazy(() => import("./components/admin/admin_auth/admin_components/blog_components/CreateBlog"));
const Createcategory = lazy(() => import("./components/admin/admin_auth/admin_components/blog_components/Createcategory"));
const BlogMngmnt = lazy(() => import("./components/admin/admin_auth/admin_components/BlogMngmnt"));
const Manageblogs = lazy(() => import("./components/admin/admin_auth/admin_components/blog_components/Manageblogs"));
const UpdateBlog = lazy(() => import("./components/admin/admin_auth/admin_components/blog_components/UpdateBlog"));
const BlogPage = lazy(() => import("../Pages/BlogPage"));
const ContactPage = lazy(() => import("../Pages/ContactPage"));
const Blog = lazy(() => import("../Pages/Blog"));
const ExpPage = lazy(() => import("../Pages/ExpPage"));
const Projects = lazy(() => import("../Pages/Projects"));
const AddProject = lazy(() => import("./components/admin/admin_auth/admin_components/project_components/AddProject"));
const AccountManagement = lazy(() => import("./components/admin/admin_auth/admin_components/AccountManagement"));
const BlogStats = lazy(() => import("./components/admin/admin_auth/admin_components/BlogStats"));
const TeamManagement = lazy(() => import("./components/admin/admin_auth/admin_components/TeamManagement"));
const ProjectManagement = lazy(() => import("./components/admin/admin_auth/admin_components/ProjectManagement"));
const AdminProfile = lazy(() => import("./components/admin/admin_auth/admin_components/AdminProfile"));


const App = () => {

  const Error = () => {
    return (
      <div className="error"><h1>ERROR : PAGE NOT FOUND</h1></div>
    )
  }

  const Loading = () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', color: '#27ae60' }}>Loading...</div>;

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/blogs" element={<BlogPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/blog" element={<Error />}></Route>
            <Route path="/blog/:id" element={<Blog />}></Route>
            <Route path="/exp" element={<ExpPage />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/*" element={<Error />}></Route>

            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<BlogMngmnt />}></Route>
              <Route path="/dashboard/blog/create" element={<Addblog />}></Route>
              <Route path="/dashboard/blog/createBlog" element={<CreateBlog />}></Route>
              <Route path="/dashboard/blog/createCategory" element={<Createcategory />}></Route>
              <Route path="/dashboard/blog/manageBlogs" element={<Manageblogs />}></Route>
              <Route path="/dashboard/blog/updateBlog/:id" element={<UpdateBlog />}></Route>
              <Route path="/dashboard/blog/updateBlog/" element={<Manageblogs />}></Route>
              <Route path="/dashboard/traffic" element={<Traffic />}></Route>
              <Route path="/dashboard/project/add" element={<AddProject />}></Route>
              <Route path="/dashboard/accounts" element={<AccountManagement />}></Route>
              <Route path="/dashboard/blog-stats" element={<BlogStats />}></Route>
              <Route path="/dashboard/team" element={<TeamManagement />}></Route>
              <Route path="/dashboard/project" element={<ProjectManagement />}></Route>
              <Route path="/dashboard/account" element={<AdminProfile />}></Route>
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App;