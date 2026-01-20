import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL, { getImageUrl } from '../../../../config/api';
import "./TeamManagement.css";

const TeamManagement = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        about: '',
        img: '',
        skills: ''
    });

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/team`);
            setTeam(res.data);
        } catch (error) {
            console.error("Error fetching team", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/team/add`, formData);
            alert("Team Member Added Successfully");
            setFormData({ name: '', role: '', about: '', img: '', skills: '' });
            setShowForm(false);
            fetchTeam();
        } catch (error) {
            console.error("Error adding member", error);
            alert("Failed to add member");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this team member?")) return;
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`${API_BASE_URL}/team/delete/${id}`, {
                headers: { 'auth-token': token }
            });
            fetchTeam();
        } catch (error) {
            console.error("Error deleting member", error);
            alert("Failed to delete member");
        }
    };

    return (
        <div className="team_management_container">
            <div className="team_management_header">
                <div>
                    <h1>Team Management</h1>
                    <p>Manage your team members and their roles</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="add_member_btn"
                >
                    {showForm ? '✕ Cancel' : '+ Add Team Member'}
                </button>
            </div>

            {/* Add Member Form */}
            {showForm && (
                <div className="add_member_form_card">
                    <h3>Add New Team Member</h3>
                    <form onSubmit={handleSubmit} className="member_form">
                        <div className="form_row">
                            <div className="form_group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={5}
                                />
                            </div>
                            <div className="form_group">
                                <label>Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Senior Developer"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                />
                            </div>
                        </div>

                        <div className="form_group">
                            <label>Image URL</label>
                            <input
                                type="url"
                                name="img"
                                placeholder="https://example.com/image.jpg"
                                value={formData.img}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form_group">
                            <label>Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                placeholder="React, Node.js, MongoDB"
                                value={formData.skills}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form_group">
                            <label>About</label>
                            <textarea
                                name="about"
                                placeholder="Brief description about the team member..."
                                value={formData.about}
                                onChange={handleChange}
                                required
                                minLength={20}
                                rows={4}
                            />
                        </div>

                        <button type="submit" className="submit_member_btn">
                            Add Team Member
                        </button>
                    </form>
                </div>
            )}

            {/* Team Members List */}
            {loading ? (
                <div className="loading_state">Loading team members...</div>
            ) : team.length === 0 ? (
                <div className="empty_state">
                    <div className="empty_icon">👥</div>
                    <h3>No team members yet</h3>
                    <p>Add your first team member to get started</p>
                    <button onClick={() => setShowForm(true)} className="empty_cta_btn">
                        Add Team Member
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="section_title">Current Team ({team.length})</h2>
                    <div className="team_grid">
                        {team.map(member => (
                            <div key={member._id} className="team_member_card">
                                <div className="member_image_wrapper">
                                    <img src={getImageUrl(member.img)} alt={member.name} />
                                </div>
                                <div className="member_content">
                                    <h3>{member.name}</h3>
                                    <p className="member_role">{member.role}</p>
                                    <p className="member_about">{member.about}</p>
                                    {member.skills && (
                                        <div className="member_skills">
                                            {member.skills.split(',').map((skill, idx) => (
                                                <span key={idx} className="skill_tag">{skill.trim()}</span>
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="delete_member_btn"
                                    >
                                        Remove Member
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default TeamManagement;
