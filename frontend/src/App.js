import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import AdminPage from './pages/AdminPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ItinerariesPage from './pages/ItinerariesPage';
import BookingsPage from './pages/BookingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/itineraries" element={<ItinerariesPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
