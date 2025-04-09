import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [itineraryId, setItineraryId] = useState('');
  const [itineraryById, setItineraryById] = useState(null);
  const [adminId, setAdminId] = useState('');
  const [userId, setUserId] = useState('');
  const [adminItineraries, setAdminItineraries] = useState([]);
  const [userItineraries, setUserItineraries] = useState([]);

  const [newItinerary, setNewItinerary] = useState({
    title: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: '',
    userId: '',
    adminId: ''
  });

  const [updateItinerary, setUpdateItinerary] = useState({
    id: '',
    title: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: ''
  });

  const API_URL = 'http://localhost:9090/itineraries';

  useEffect(() => {
    fetchAllItineraries();
  }, []);

  const fetchAllItineraries = async () => {
    try {
      const adminIdToUse = 1; // or make this dynamic
      const res = await axios.get(`${API_URL}/admin/${adminIdToUse}`);
      setItineraries(res.data);
    } catch (err) {
      alert('Failed to fetch all itineraries.');
    }
  };
  

  const fetchItineraryById = async () => {
    try {
      const res = await axios.get(`${API_URL}/${itineraryId}`);
      setItineraryById(res.data);
    } catch (err) {
      alert('Itinerary not found!');
    }
  };

  const fetchItinerariesByAdmin = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/${adminId}`);
      setAdminItineraries(res.data);
    } catch {
      alert('No itineraries found for admin.');
    }
  };

  const fetchItinerariesByUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`);
      setUserItineraries(res.data);
    } catch {
      alert('No itineraries found for user.');
    }
  };

  const createItinerary = async () => {
    await axios.post(API_URL, newItinerary);
    alert('Itinerary created!');
    fetchAllItineraries();
  };

  const updateItineraryHandler = async () => {
    await axios.put(`${API_URL}/${updateItinerary.id}`, updateItinerary);
    alert('Itinerary updated!');
    fetchAllItineraries();
  };

  const deleteItinerary = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    alert('Itinerary deleted!');
    fetchAllItineraries();
  };

  // Style definitions
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
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
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
      <h1 style={{ textAlign: 'center' }}>🗺️ Itineraries Page</h1>

      {/* Search by Itinerary ID */}
      <div style={cardStyle}>
        <h2>🔍 Search by Itinerary ID</h2>
        <input style={inputStyle} value={itineraryId} onChange={(e) => setItineraryId(e.target.value)} placeholder="Enter itinerary ID" />
        <button onClick={fetchItineraryById} style={buttonStyle}>Fetch</button>
        {itineraryById && (
          <pre>{JSON.stringify(itineraryById, null, 2)}</pre>
        )}
      </div>

      {/* Fetch by Admin/User */}
      <div style={cardStyle}>
        <h2>👤 Fetch by Admin/User</h2>
        <input style={inputStyle} value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder="Admin ID" />
        <button onClick={fetchItinerariesByAdmin} style={buttonStyle}>Fetch Admin Itineraries</button>

        <input style={inputStyle} value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
        <button onClick={fetchItinerariesByUser} style={buttonStyle}>Fetch User Itineraries</button>
      </div>

      {/* Create Itinerary */}
      <div style={cardStyle}>
        <h2>➕ Create Itinerary</h2>
        {Object.entries(newItinerary).map(([key, val]) => (
          <input
            key={key}
            style={inputStyle}
            value={val}
            placeholder={key}
            onChange={(e) => setNewItinerary({ ...newItinerary, [key]: e.target.value })}
          />
        ))}
        <button onClick={createItinerary} style={{ ...buttonStyle, background: '#28a745' }}>Create</button>
      </div>

      {/* Update Itinerary */}
      <div style={cardStyle}>
        <h2>✏️ Update Itinerary</h2>
        {Object.entries(updateItinerary).map(([key, val]) => (
          <input
            key={key}
            style={inputStyle}
            value={val}
            placeholder={key}
            onChange={(e) => setUpdateItinerary({ ...updateItinerary, [key]: e.target.value })}
          />
        ))}
        <button onClick={updateItineraryHandler} style={{ ...buttonStyle, background: '#ffc107' }}>Update</button>
      </div>

      {/* All Itineraries */}
      <div style={cardStyle}>
        <h2>📋 All Itineraries</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: '#f1f1f1' }}>
              <th style={thtdStyle}>ID</th>
              <th style={thtdStyle}>Title</th>
              <th style={thtdStyle}>Destination</th>
              <th style={thtdStyle}>Start</th>
              <th style={thtdStyle}>End</th>
              <th style={thtdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {itineraries.map((i) => (
              <tr key={i.itineraryId}>
                <td style={thtdStyle}>{i.itineraryId}</td>
                <td style={thtdStyle}>{i.title}</td>
                <td style={thtdStyle}>{i.destination}</td>
                <td style={thtdStyle}>{i.startDate}</td>
                <td style={thtdStyle}>{i.endDate}</td>
                <td style={thtdStyle}>
                  <button onClick={() => deleteItinerary(i.id)} style={{ ...buttonStyle, background: '#dc3545' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin/User Results */}
      <div style={cardStyle}>
        {adminItineraries.length > 0 && (
          <>
            <h2>🛂 Admin Itineraries</h2>
            <pre>{JSON.stringify(adminItineraries, null, 2)}</pre>
          </>
        )}
        {userItineraries.length > 0 && (
          <>
            <h2>👥 User Itineraries</h2>
            <pre>{JSON.stringify(userItineraries, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
};

export default ItinerariesPage;
