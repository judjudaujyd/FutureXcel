import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL, { getImageUrl } from '../../../../config/api';
import "./ProjectManagement.css";

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/projects?limit=100`);
            setProjects(res.data.projects);
        } catch (error) {
            console.error("Error fetching projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            console.log("Sending DELETE request for ID:", id);
            await axios.delete(`${API_BASE_URL}/projects/${id}`);
            console.log("Delete success");
            setDeleteConfirmId(null);
            fetchProjects();
        } catch (error) {
            console.error("Delete error:", error);
            alert(`Failed to delete project: ${error.response?.data?.error || error.message}`);
            setDeleteConfirmId(null);
        }
    };

    return (
        <div className="project_management_container">
            <div className="project_management_header">
                <div>
                    <h1>Project Management</h1>
                    <p>Manage your portfolio projects and showcase your work</p>
                </div>
                <Link to="/dashboard/project/add" className="add_project_btn">
                    + Add New Project
                </Link>
            </div>

            {loading ? (
                <div className="loading_state">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="empty_state">
                    <div className="empty_icon">💼</div>
                    <h3>No projects yet</h3>
                    <p>Add your first project to showcase your work</p>
                    <Link to="/dashboard/project/add" className="empty_cta_btn">
                        Add Project
                    </Link>
                </div>
            ) : (
                <div className="projects_grid">
                    {projects.map(project => (
                        <div key={project._id} className="project_card">
                            <div className="project_image_wrapper">
                                <img src={getImageUrl(project.image)} alt={project.title} />
                            </div>
                            <div className="project_content">
                                <h3>{project.title}</h3>
                                <p className="project_description">{project.description?.substring(0, 100)}...</p>
                                <div className="project_meta">
                                    <div className="project_stats">
                                        <span className="project_category">{project.category}</span>
                                        <span className="project_price">${project.price?.toLocaleString()}</span>
                                    </div>
                                    {deleteConfirmId === project._id ? (
                                        <div className="delete_confirmation_actions">
                                            <button
                                                className="confirm_delete_btn"
                                                onClick={() => handleDelete(project._id)}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                className="cancel_delete_btn"
                                                onClick={() => setDeleteConfirmId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirmId(project._id)}
                                            className="delete_project_btn_small"
                                            title="Delete Project"
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectManagement;
