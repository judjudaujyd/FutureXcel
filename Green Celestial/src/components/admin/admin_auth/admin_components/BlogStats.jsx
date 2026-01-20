import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../config/api';

const BlogStats = () => {
    const [stats, setStats] = useState(null);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/blogs/stats`);
            setStats(res.data);
        } catch (error) {
            console.error("Error fetching blog stats", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (!stats) return <p>Loading stats...</p>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '2rem', borderBottom: '2px solid #2ecc71', paddingBottom: '0.5rem' }}>Blog Statistics</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ padding: '30px', background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', borderRadius: '15px', color: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                    <h3 style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '10px' }}>Total Blogs</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>{stats.totalBlogs}</p>
                </div>
                <div style={{ padding: '30px', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', borderRadius: '15px', color: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                    <h3 style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '10px' }}>Total Views</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>{stats.totalViews}</p>
                </div>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Most Popular Blogs</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {stats.topBlogs.map((blog, index) => (
                        <li key={blog._id} style={{
                            padding: '15px',
                            borderBottom: index !== stats.topBlogs.length - 1 ? '1px solid #eee' : 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '1.1rem'
                        }}>
                            <span style={{ color: '#555' }}>
                                <span style={{ marginRight: '15px', color: '#bdc3c7', fontWeight: 'bold' }}>#{index + 1}</span>
                                {blog.title}
                            </span>
                            <span style={{ fontWeight: 'bold', color: '#2980b9', background: '#ecf0f1', padding: '5px 15px', borderRadius: '20px' }}>{blog.views} views</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogStats;
