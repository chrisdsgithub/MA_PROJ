import React, { useState } from 'react';
import axios from 'axios';

const BookingsPage = () => {
  const [bookingRequest, setBookingRequest] = useState({
    email: '',
    destination: '',
    itineraryId: '',
    activityId: '',
    timeSlot: '',
  });

  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);

  const API_URL = 'http://localhost:9090/bookings';

  const createBooking = async () => {
    try {
      const payload = {
        ...bookingRequest,
        itineraryId: bookingRequest.itineraryId || null,
      };
      await axios.post(API_URL, payload);
      alert('✅ Booking created successfully!');
      setBookingRequest({ email: '', destination: '', itineraryId: '', activityId: '', timeSlot: '' });
    } catch (error) {
      alert(`❌ Booking failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/history?email=${email}`);
      setBookings(res.data);
    } catch (error) {
      alert('❌ Error fetching bookings.');
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`${API_URL}/${bookingId}?email=${email}`);
      alert('🗑️ Booking canceled!');
      fetchBookings(); // Refresh list
    } catch (error) {
      alert('❌ Error cancelling booking.');
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
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
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

  const cancelButtonStyle = {
    ...buttonStyle,
    background: '#dc3545',
    marginLeft: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  };

  const thtdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>📚 Booking Management</h1>

      {/* Booking Creation */}
      <div style={cardStyle}>
        <h2>✈️ Create a Booking</h2>
        <input
          type="email"
          placeholder="User Email"
          value={bookingRequest.email}
          onChange={(e) => setBookingRequest({ ...bookingRequest, email: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Destination"
          value={bookingRequest.destination}
          onChange={(e) => setBookingRequest({ ...bookingRequest, destination: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="(Optional) Itinerary ID"
          value={bookingRequest.itineraryId}
          onChange={(e) => setBookingRequest({ ...bookingRequest, itineraryId: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Activity ID"
          value={bookingRequest.activityId}
          onChange={(e) => setBookingRequest({ ...bookingRequest, activityId: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Time Slot (HH:mm:ss)"
          value={bookingRequest.timeSlot}
          onChange={(e) => setBookingRequest({ ...bookingRequest, timeSlot: e.target.value })}
          style={inputStyle}
        />
        <button onClick={createBooking} style={{ ...buttonStyle, background: '#28a745' }}>Create Booking</button>
      </div>

      {/* Booking History */}
      <div style={cardStyle}>
        <h2>📜 View My Bookings</h2>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <button onClick={fetchBookings} style={buttonStyle}>Fetch Bookings</button>

        {bookings.length > 0 && (
          <table style={tableStyle}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={thtdStyle}>Booking ID</th>
                <th style={thtdStyle}>Itinerary ID</th>
                <th style={thtdStyle}>Activity ID</th>
                <th style={thtdStyle}>Time Slot</th>
                <th style={thtdStyle}>Status</th>
                <th style={thtdStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td style={thtdStyle}>{booking.bookingId}</td>
                  <td style={thtdStyle}>{booking.itineraryId}</td>
                  <td style={thtdStyle}>{booking.activityId}</td>
                  <td style={thtdStyle}>{booking.timeSlot}</td>
                  <td style={thtdStyle}>{booking.status}</td>
                  <td style={thtdStyle}>
                    <button
                      onClick={() => cancelBooking(booking.bookingId)}
                      style={cancelButtonStyle}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
