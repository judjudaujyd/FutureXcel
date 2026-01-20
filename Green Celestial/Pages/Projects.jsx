import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL, { getImageUrl } from '../src/config/api';
import Header from '../src/components/landing_page/Header';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        sort: 'date_desc',
        page: 1
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProjects: 0
    });
    const [loading, setLoading] = useState(false);

    const categories = ['Residential', 'Commercial', 'Industrial', 'Landscape']; // Example categories

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.search) params.append('search', filters.search);
            if (filters.sort) params.append('sort', filters.sort);
            params.append('page', filters.page);

            const response = await axios.get(`${API_BASE_URL}/projects?${params.toString()}`);
            setProjects(response.data.projects);
            setPagination({
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalProjects: response.data.totalProjects
            });
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setFilters(prev => ({ ...prev, page: newPage }));
        }
    };

    return (
        <>
            <Header />
            <div className="projects-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', marginTop: '100px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>Our Projects</h1>

                {/* Filters Section */}
                <div className="filters" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search projects..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />

                    <select name="category" value={filters.category} onChange={handleFilterChange} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    <select name="sort" value={filters.sort} onChange={handleFilterChange} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Projects Grid */}
                {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
                    <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {projects.map(project => (
                            <div key={project._id} className="project-card" style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                <img
                                    src={getImageUrl(project.image)}
                                    alt={project.title}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '1rem' }}>
                                    <h3>{project.title}</h3>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{project.category}</p>
                                    <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>${project.price}</p>
                                    <Link to={`/project/${project._id}`} style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none', color: '#27ae60' }}>View Details &rarr;</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
                    <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                    >
                        Previous
                    </button>
                    <span style={{ alignSelf: 'center' }}>Page {pagination.currentPage} of {pagination.totalPages}</span>
                    <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === pagination.totalPages}
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Projects;
