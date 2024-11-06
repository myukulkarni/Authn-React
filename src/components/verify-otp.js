import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './verify-otp.css';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [userId] = useState(8); // Assuming a static user ID, adjust as needed
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    try {
      // Send OTP verification request
      const response = await axios.post('http://127.0.0.1:8000/authapp/verify-otp/', { 
        user_id: userId, 
        email_otp: otp  // Ensure this matches the API's expected parameter name
      });

      console.log('OTP Verified:', response.data);
      setSuccess('OTP verification successful!');
      setError('');

      // Navigate to login page upon success
      navigate('/login');
    } catch (error) {
      // Handle different kinds of errors more specifically
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Server error:', error.response.data);
        setError(error.response.data.message || 'Invalid OTP. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response from server:', error.request);
        setError('No response from server. Please check your network and try again.');
      } else {
        // Something else happened
        console.error('Error:', error.message);
        setError('An error occurred during OTP verification. Please try again.');
      }
      setSuccess('');
    } 
  };

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleVerify}>
        <h2>Verify OTP</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="input-group">
          <label>Enter OTP</label>
          <input 
            type="text" 
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            required
          />
        </div>

        <button type="submit" className="otp-button">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
