import React, { useState, useEffect } from 'react';
import './AdminProfile.css';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        name: 'Admin User',
        email: 'admin@greencelestial.com',
        role: 'Super Admin',
        joinDate: '2024-01-15'
    });

    useEffect(() => {
        // In a real app, fetch admin data from API using auth token
        const token = localStorage.getItem('authToken');
        if (token) {
            // Decode token or fetch user data
            // For now using placeholder data
        }
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            window.location.href = '/admin';
        }
    };

    return (
        <div className="admin_profile_container">
            <div className="profile_header">
                <h1>My Account</h1>
                <p>Manage your profile and account settings</p>
            </div>

            <div className="profile_content">
                {/* Profile Card */}
                <div className="profile_card">
                    <div className="profile_avatar_section">
                        <div className="profile_avatar">
                            <span className="avatar_icon">👤</span>
                        </div>
                        <button className="change_avatar_btn">Change Photo</button>
                    </div>

                    <div className="profile_info_section">
                        <div className="info_group">
                            <label>Full Name</label>
                            <div className="info_value">{adminData.name}</div>
                        </div>

                        <div className="info_group">
                            <label>Email Address</label>
                            <div className="info_value">{adminData.email}</div>
                        </div>

                        <div className="info_row">
                            <div className="info_group">
                                <label>Role</label>
                                <div className="info_value">
                                    <span className="role_badge">{adminData.role}</span>
                                </div>
                            </div>

                            <div className="info_group">
                                <label>Member Since</label>
                                <div className="info_value">
                                    {new Date(adminData.joinDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="account_actions_card">
                    <h3>Account Actions</h3>

                    <div className="action_buttons">
                        <button className="action_btn edit_btn">
                            <span className="btn_icon">✏️</span>
                            <div>
                                <strong>Edit Profile</strong>
                                <p>Update your personal information</p>
                            </div>
                        </button>

                        <button className="action_btn password_btn">
                            <span className="btn_icon">🔒</span>
                            <div>
                                <strong>Change Password</strong>
                                <p>Update your account password</p>
                            </div>
                        </button>

                        <button className="action_btn logout_btn" onClick={handleLogout}>
                            <span className="btn_icon">🚪</span>
                            <div>
                                <strong>Logout</strong>
                                <p>Sign out from your account</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Security Info */}
                <div className="security_info_card">
                    <h3>Security Information</h3>
                    <div className="security_items">
                        <div className="security_item">
                            <span className="security_icon">✓</span>
                            <div>
                                <strong>Two-Factor Authentication</strong>
                                <p>Not enabled</p>
                            </div>
                        </div>
                        <div className="security_item">
                            <span className="security_icon">✓</span>
                            <div>
                                <strong>Last Login</strong>
                                <p>{new Date().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
