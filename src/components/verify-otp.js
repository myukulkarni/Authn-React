import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './verify-otp.css';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [userId,] = useState(8); // Set this to the correct user ID you are verifying for
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      // Send user_id along with email_otp (updated from otp to email_otp)
      const response = await axios.post('http://127.0.0.1:8000/authapp/verify-otp/', { 
        user_id: userId, 
        email_otp: otp  // changed 'otp' to 'email_otp'
      });

      console.log('OTP Verified:', response.data);
      setSuccess('OTP verification successful!');
      setError('');

      // Navigate to the login page after successful verification
      navigate('/login');
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError('Invalid OTP. Please try again.');
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
