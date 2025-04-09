import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [userId, setUserId] = useState('');
  const [preferences, setPreferences] = useState('');

  const API_URL = 'http://localhost:9090/admin';

  useEffect(() => {
    fetchPagedUsers(page, size);
  }, [page, size]);

  const fetchPagedUsers = async (page, size) => {
    try {
      const res = await axios.get(`${API_URL}/paged`, {
        params: { page, size },
      });
      setUsers(res.data.content);
    } catch (error) {
      alert('Error fetching users!');
    }
  };

  const handlePromote = async (userId) => {
    try {
      await axios.put(`${API_URL}/promote/${userId}`);
      alert('User promoted to ADMIN!');
      fetchPagedUsers(page, size);
    } catch (error) {
      alert('Error promoting user!');
    }
  };

  const handleToggleStatus = async (userId, isActive) => {
    try {
      if (isActive) {
        await axios.put(`${API_URL}/disable/${userId}`);
        alert('User disabled!');
      } else {
        await axios.put(`${API_URL}/enable/${userId}`);
        alert('User enabled!');
      }
      fetchPagedUsers(page, size);
    } catch (error) {
      alert('Error updating user status!');
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const res = await axios.get(`${API_URL}/${userId}/preferences`);
      setPreferences(res.data);
    } catch (error) {
      alert('Could not fetch preferences for user ID: ' + userId);
      setPreferences('');
    }
  };

  const handleChangePage = (newPage) => {
    if (newPage >= 0) setPage(newPage);
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '30px',
    fontFamily: 'Inter, sans-serif',
  };

  const cardStyle = {
    background: '#fff',
    padding: '20px',
    marginBottom: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    width: 'calc(100% - 20px)',
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thtdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🛡️ Admin Management Portal</h1>

      {/* 🔄 Pagination */}
      <div style={cardStyle}>
        <h2>🔄 Paginate Users</h2>
        <button style={buttonStyle} onClick={() => handleChangePage(page - 1)} disabled={page <= 0}>
          Previous
        </button>
        <button style={buttonStyle} onClick={() => handleChangePage(page + 1)}>
          Next
        </button>
      </div>

      {/* 🎯 Get Preferences */}
      <div style={cardStyle}>
        <h2>🎯 Get User Preferences</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={inputStyle}
        />
        <button onClick={fetchUserPreferences} style={buttonStyle}>
          Get Preferences
        </button>
        {preferences && (
          <p>
            <strong>Preferences:</strong> {preferences}
          </p>
        )}
      </div>

      {/* 🧑‍🤝‍🧑 Users Table */}
      <div style={cardStyle}>
        <h2>🧑‍🤝‍🧑 User List</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Name</th>
              <th style={thtdStyle}>Email</th>
              <th style={thtdStyle}>Role</th>
              <th style={thtdStyle}>Status</th>
              <th style={thtdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={thtdStyle}>{user.id}</td>
                <td style={thtdStyle}>{user.name}</td>
                <td style={thtdStyle}>{user.email}</td>
                <td style={thtdStyle}>{user.role}</td>
                <td style={thtdStyle}>{user.active ? '✅ Enabled' : '❌ Disabled'}</td>
                <td style={thtdStyle}>
                  <button style={buttonStyle} onClick={() => handlePromote(user.id)}>
                    Promote
                  </button>
                  <button
                    style={{
                      ...buttonStyle,
                      background: user.active ? '#dc3545' : '#28a745',
                    }}
                    onClick={() => handleToggleStatus(user.id, user.active)}
                  >
                    {user.active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
