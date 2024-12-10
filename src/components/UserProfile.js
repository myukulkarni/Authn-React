import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Correct import for version 2.x.x
import './UserProfile.css'; // Import the CSS file for styling
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    // Decode the token to check if it's expired
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds
      if (decoded.exp < currentTime) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("access");
        navigate("/login");
        return;
      }
    } catch (err) {
      setError("Invalid token.");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/authapp/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.detail || "Failed to fetch profile");
          return;
        }

        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong while fetching your profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Redirect to login page after logging out
    navigate("/login");
  };

  // Continue shopping function
  const handleContinueShopping = () => {
    // Redirect to homepage
    navigate("/");
  };

  return (
    <div className="profile-container">
      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div className="profile-details">
          <h1>User Profile</h1>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Contact:</strong> {profile.contact_no}</p>
          <p><strong>Address:</strong> {profile.residential_address}</p>
          <p><strong>Pincode:</strong> {profile.pincode}</p>

          {/* Button Section */}
          <div className="buttons">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <button onClick={handleContinueShopping} className="continue-shopping-btn">Continue Shopping</button>
            <Link to="/order" className="profile-icon">
          <FaShoppingBag /> {/* Icon for User Profile */}
        </Link>
          </div>
        </div>
      ) : (
        !error && <p>Profile not available.</p>
      )}
    </div>
  );
};

export default UserProfile;
