import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../config/api';
import "./AccountManagement.css";

const AccountManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmins = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/all`, {
                headers: { "auth-token": localStorage.getItem("authToken") }
            });
            setAdmins(res.data);
        } catch (error) {
            console.error("Error fetching admins", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/admin/delete/${id}`, {
                headers: { "auth-token": localStorage.getItem("authToken") }
            });
            setAdmins(admins.filter(admin => admin._id !== id));
        } catch (error) {
            alert("Failed to delete admin");
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div className="am-container">
            <div className="am-header">
                <h2>Admin Accounts</h2>
            </div>
            {loading ? <p>Loading...</p> : (
                <div className="am-table-wrapper">
                    <table className="am-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin._id}>
                                    <td>{admin.name}</td>
                                    <td>{admin.mail}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(admin._id)}
                                            className="am-delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AccountManagement;
