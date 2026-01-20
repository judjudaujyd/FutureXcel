import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../../../config/api";
import { Link } from "react-router-dom";
import "./blogmngmnt.css";

const BlogMngmnt = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalProjects: 0,
    totalTeam: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [blogsRes, projectsRes, teamRes] = await Promise.all([
          fetch(`${API_BASE_URL}/blogs?limit=1000`),
          fetch(`${API_BASE_URL}/projects?limit=1000`),
          fetch(`${API_BASE_URL}/team`)
        ]);

        const blogsData = await blogsRes.json();
        const projectsData = await projectsRes.json();
        const teamData = await teamRes.json();

        console.log('Blogs Data:', blogsData);
        console.log('Projects Data:', projectsData);
        console.log('Team Data:', teamData);

        // Handle different response structures
        // Blogs API returns { blogs: [...], totalPages, currentPage }
        const blogs = blogsData.blogs || [];
        // Projects API returns { projects: [...], totalPages, currentPage }
        const projects = projectsData.projects || [];
        // Team API returns array directly
        const team = Array.isArray(teamData) ? teamData : [];

        const totalViews = Array.isArray(blogs)
          ? blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)
          : 0;

        setStats({
          totalBlogs: blogs.length,
          totalProjects: projects.length,
          totalTeam: team.length,
          totalViews
        });

        console.log('Stats set:', {
          totalBlogs: blogs.length,
          totalProjects: projects.length,
          totalTeam: team.length,
          totalViews
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    { title: "Create Blog", icon: "✍️", link: "/dashboard/blog/create", color: "#3498db" },
    { title: "Add Project", icon: "🚀", link: "/dashboard/project/add", color: "#9b59b6" },
    { title: "Add Team Member", icon: "👥", link: "/dashboard/team", color: "#e74c3c" },
    { title: "View Analytics", icon: "📊", link: "/dashboard/blog-stats", color: "#27ae60" }
  ];

  const managementCards = [
    { title: "Blog Management", desc: "View, edit, and manage all blogs", icon: "📝", link: "/dashboard/blog/manageBlogs", color: "#3498db" },
    { title: "Project Management", desc: "Manage your portfolio projects", icon: "💼", link: "/dashboard/project", color: "#9b59b6" },
    { title: "Team Management", desc: "Manage team members and roles", icon: "👨‍💼", link: "/dashboard/team", color: "#e74c3c" },
    { title: "Analytics Dashboard", desc: "View detailed statistics", icon: "📈", link: "/dashboard/blog-stats", color: "#27ae60" }
  ];

  return (
    <div className="dashboard_overview">
      <div className="overview_header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your site</p>
      </div>

      {/* Stats Cards */}
      <div className="stats_grid">
        <div className="stat_card">
          <div className="stat_icon" style={{ background: 'rgba(52, 152, 219, 0.1)' }}>
            <span style={{ color: '#3498db' }}>📝</span>
          </div>
          <div className="stat_content">
            <h3>{loading ? '...' : stats.totalBlogs}</h3>
            <p>Total Blogs</p>
          </div>
        </div>

        <div className="stat_card">
          <div className="stat_icon" style={{ background: 'rgba(155, 89, 182, 0.1)' }}>
            <span style={{ color: '#9b59b6' }}>🚀</span>
          </div>
          <div className="stat_content">
            <h3>{loading ? '...' : stats.totalProjects}</h3>
            <p>Total Projects</p>
          </div>
        </div>

        <div className="stat_card">
          <div className="stat_icon" style={{ background: 'rgba(231, 76, 60, 0.1)' }}>
            <span style={{ color: '#e74c3c' }}>👥</span>
          </div>
          <div className="stat_content">
            <h3>{loading ? '...' : stats.totalTeam}</h3>
            <p>Team Members</p>
          </div>
        </div>

        <div className="stat_card">
          <div className="stat_icon" style={{ background: 'rgba(39, 174, 96, 0.1)' }}>
            <span style={{ color: '#27ae60' }}>👁️</span>
          </div>
          <div className="stat_content">
            <h3>{loading ? '...' : stats.totalViews}</h3>
            <p>Total Views</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2>Quick Actions</h2>
        <p className="section_desc">Perform common tasks quickly</p>
        <div className="quick_actions_grid">
          {quickActions.map((action, index) => (
            <Link to={action.link} key={index} className="quick_action_card" style={{ borderColor: action.color }}>
              <span className="action_icon">{action.icon}</span>
              <h3>{action.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Management */}
      <div className="section">
        <h2>Management</h2>
        <p className="section_desc">Access your content management tools</p>
        <div className="management_grid">
          {managementCards.map((card, index) => (
            <Link to={card.link} key={index} className="management_card">
              <div className="management_icon" style={{ background: `${card.color}15` }}>
                <span style={{ fontSize: '2rem' }}>{card.icon}</span>
              </div>
              <div className="management_content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <span className="card_arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogMngmnt;
