import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import travelAnimation from "../assets/travel.json";
import "./PageStyles.css";

export default function HomePage() {
  const cards = [
    {
      icon: "👤",
      title: "Users",
      desc: "View and manage user info",
      route: "/users",
    },
    {
      icon: "🛠️",
      title: "Admin",
      desc: "Admin controls & config",
      route: "/admin",
    },
    {
      icon: "🎯",
      title: "Activities",
      desc: "Browse or add activities",
      route: "/activities",
    },
    {
      icon: "🧭",
      title: "Itineraries",
      desc: "Build your travel plans",
      route: "/itineraries",
    },
    {
      icon: "📅",
      title: "Bookings",
      desc: "Manage all your bookings",
      route: "/bookings",
    },
  ];

  const handleNavigation = (route) => {
    window.location.href = route;
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <Player autoplay loop src={travelAnimation} className="hero-img" />

        <h1>
          Welcome to <span className="gradient-text">TripSync</span>
        </h1>
        <p className="subtitle">
          🌍 Plan smarter. ✈️ Travel better. 🧳 Explore freely.
        </p>

        <div className="button-group">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => handleNavigation(card.route)}
              className="nav-btn"
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{card.icon}</div>
              {card.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
