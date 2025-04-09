import React, { useState } from 'react';
import axios from 'axios';
import user_id from "../assets/user_id.jpg";
import user_email from "../assets/user_email.png";

const UserPage = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    preferences: '',
  });

  const [updateUserData, setUpdateUserData] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    preferences: '',
  });

  const API_URL = 'http://localhost:9090/users';

  const fetchUserById = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile?userId=${userId}`);
      setSearchResult(res.data);
    } catch (error) {
      alert('User not found!');
      setSearchResult(null);
    }
  };

  const fetchUserByEmail = async () => {
    try {
      const res = await axios.get(`${API_URL}/email/${email}`);
      setSearchResult(res.data);
    } catch (error) {
      alert('User not found!');
      setSearchResult(null);
    }
  };

  const createUser = async () => {
    try {
      await axios.post(`${API_URL}/register`, { ...newUser, role: 'USER' });
      alert('User created!');
      setNewUser({ name: '', email: '', password: '', preferences: '' });
    } catch (error) {
      alert('Error creating user!');
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`${API_URL}/profile?userId=${updateUserData.id}`, { ...updateUserData, role: 'USER' });
      alert('User updated!');
      setUpdateUserData({ userId: '', name: '', email: '', password: '', preferences: '' });
    } catch (error) {
      alert('Error updating user!');
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Inter, sans-serif',
  };

  const cardStyle = {
    background: '#fff',
    padding: '20px',
    marginBottom: '20px',
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
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🌍 User Management Portal</h1>

      {/* Get User by ID */}
      <div style={cardStyle}>
        <h2>Get User by ID</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <img src={user_id} alt="User ID" style={{ width: '100px', height: '100px', borderRadius: '40px' }} />
        </div>
        <button onClick={fetchUserById} style={buttonStyle}>Fetch</button>
      </div>

      {/* Get User by Email */}
      <div style={cardStyle}>
        <h2>Get User by Email</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <img src={user_email} alt="User Email" style={{ width: '90px', height: '90px', borderRadius: '40px' }} />
        </div>
        <button onClick={fetchUserByEmail} style={buttonStyle}>Fetch</button>
      </div>

      {/* Create User */}
      <div style={cardStyle}>
        <h2>Create New User</h2>
        <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} style={inputStyle} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={inputStyle} />
        <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Preferences" value={newUser.preferences} onChange={(e) => setNewUser({ ...newUser, preferences: e.target.value })} style={inputStyle} />
        <button onClick={createUser} style={{ ...buttonStyle, background: '#28a745' }}>Create</button>
      </div>

      {/* Update User */}
      <div style={cardStyle}>
        <h2>✏️ Update User</h2>
        <input type="text" placeholder="User ID" value={updateUserData.id} onChange={(e) => setUpdateUserData({ ...updateUserData, userId: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Name" value={updateUserData.name} onChange={(e) => setUpdateUserData({ ...updateUserData, name: e.target.value })} style={inputStyle} />
        <input type="email" placeholder="Email" value={updateUserData.email} onChange={(e) => setUpdateUserData({ ...updateUserData, email: e.target.value })} style={inputStyle} />
        <input type="password" placeholder="Password" value={updateUserData.password} onChange={(e) => setUpdateUserData({ ...updateUserData, password: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Preferences" value={updateUserData.preferences} onChange={(e) => setUpdateUserData({ ...updateUserData, preferences: e.target.value })} style={inputStyle} />
        <button onClick={updateUser} style={{ ...buttonStyle, background: '#ffc107' }}>Update</button>
      </div>

      {/* Display User Result */}
      {searchResult && (
        <div style={cardStyle}>
          <h2>👤 User Info</h2>
          <table style={tableStyle}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={thtdStyle}>ID</th>
                <th style={thtdStyle}>Name</th>
                <th style={thtdStyle}>Email</th>
                <th style={thtdStyle}>Role</th>
                <th style={thtdStyle}>Preferences</th>
                <th style={thtdStyle}>Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={thtdStyle}>{searchResult.userId}</td>
                <td style={thtdStyle}>{searchResult.name}</td>
                <td style={thtdStyle}>{searchResult.email}</td>
                <td style={thtdStyle}>{searchResult.role}</td>
                <td style={thtdStyle}>{searchResult.preferences}</td>
                <td style={thtdStyle}>{searchResult.active ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPage;
