import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('http://127.0.0.1:8000/authapp/login/', {
        username,
        password,
      });

      console.log('Login successful!', response.data);
      // Store the tokens in localStorage
      localStorage.setItem('access', response.data.access);  // Save access token
      localStorage.setItem('refresh', response.data.refresh);  // Save refresh token

      setError('');  // Clear any previous error message

      // Redirect to the homepage or dashboard after successful login
      navigate('/'); // You can change this to any route you want the user to go after login
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password.'); // Set error message if login fails
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}  {/* Display error if any */}

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
