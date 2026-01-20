import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../../../../../config/api';
import './AddProject.css';

const AddProject = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        contents: '',
        category: '',
        price: '',
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('contents', formData.contents);
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('image', formData.image);

        try {
            await axios.post(`${API_BASE_URL}/projects`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Project added successfully!');
            navigate('/dashboard/project');
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Failed to add project');
        }
        setLoading(false);
    };

    return (
        <div className="add_project_container">
            <div className="add_project_header">
                <div>
                    <h1>Add New Project</h1>
                    <p>Create a new portfolio project to showcase your work</p>
                </div>
                <Link to="/dashboard/project" className="back_btn">
                    ← Back to Projects
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="project_form">
                <div className="form_section">
                    <h3>Project Details</h3>

                    <div className="form_group">
                        <label htmlFor="title">Project Title *</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="e.g., Modern Residential Complex"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="description">Short Description *</label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Brief one-line description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="contents">Detailed Content *</label>
                        <textarea
                            id="contents"
                            name="contents"
                            placeholder="Provide detailed information about the project..."
                            value={formData.contents}
                            onChange={handleChange}
                            required
                            rows="6"
                        />
                    </div>

                    <div className="form_row">
                        <div className="form_group">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Landscape">Landscape</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label htmlFor="price">Price (USD) *</label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                placeholder="e.g., 50000"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                <div className="form_section">
                    <h3>Project Image</h3>

                    <div className="form_group">
                        <label htmlFor="image">Upload Image *</label>
                        <div className="file_upload_wrapper">
                            <input
                                id="image"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className="file_input"
                            />
                            <div className="file_upload_label">
                                <span className="upload_icon">📁</span>
                                <span>{formData.image ? formData.image.name : 'Choose an image file'}</span>
                            </div>
                        </div>
                    </div>

                    {preview && (
                        <div className="image_preview">
                            <img src={preview} alt="Preview" />
                            <p className="preview_label">Image Preview</p>
                        </div>
                    )}
                </div>

                <div className="form_actions">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/project')}
                        className="cancel_btn"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="submit_btn"
                    >
                        {loading ? 'Adding Project...' : '✓ Add Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProject;
