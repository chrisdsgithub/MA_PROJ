import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState('');
  const [newActivity, setNewActivity] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
  });

  const API_URL = 'http://localhost:9090/activities';

  const containerStyle = {
    maxWidth: '900px',
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
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: 'calc(100% - 20px)',
  };

  const buttonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    marginTop: '10px',
    background: '#007bff',
    color: '#fff',
    fontFamily:'Inter',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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

  const fetchAll = async () => {
    const res = await axios.get(`${API_URL}`);
    setActivities(res.data);
  };

  const fetchById = async () => {
    const res = await axios.get(`${API_URL}/${activityId}`);
    setActivities([res.data]);
  };

  const createActivity = async () => {
    await axios.post(`${API_URL}/create`, newActivity);
    alert('Activity created!');
    setNewActivity({ name: '', location: '', description: '', price: '' });
    fetchAll();
  };

  const deleteActivity = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    alert('Activity deleted!');
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🌍 Activity Management Portal</h1>

      {/* Fetch Section */}
      <div style={cardStyle}>
        <h2>🔍 Fetch Activity by ID</h2>
        <input
          type="text"
          placeholder="Activity ID"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          style={inputStyle}
        />
        <button onClick={fetchById} style={buttonStyle}>Fetch</button>
      </div>

      {/* Create Section */}
      <div style={cardStyle}>
        <h2>➕ Create New Activity</h2>
        <input
          type="text"
          placeholder="Name"
          value={newActivity.name}
          onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Location"
          value={newActivity.location}
          onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Description"
          value={newActivity.description}
          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={newActivity.price}
          onChange={(e) => setNewActivity({ ...newActivity, price: e.target.value })}
          style={inputStyle}
        />
        <button onClick={createActivity} style={{ ...buttonStyle, background: '#28a745' }}>Create</button>
      </div>

      {/* Table Display */}
      <div style={cardStyle}>
        <h2>📋 All Activities</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Name</th>
              <th style={thtdStyle}>Location</th>
              <th style={thtdStyle}>Description</th>
              <th style={thtdStyle}>Price</th>
              <th style={thtdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.activityId}>
                <td style={thtdStyle}>{activity.activityId}</td>
                <td style={thtdStyle}>{activity.name}</td>
                <td style={thtdStyle}>{activity.location}</td>
                <td style={thtdStyle}>{activity.description}</td>
                <td style={thtdStyle}>₹{activity.price}</td>
                <td style={thtdStyle}>
                  <button onClick={() => deleteActivity(activity.activityId)} style={{ ...buttonStyle, background: '#dc3545' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivitiesPage;
