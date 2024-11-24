import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./verify-otp.css";

const OtpVerifyForm = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/authapp/verify-otp/${id}/`, { otp });
      setMessage(response.data.success);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to verify OTP.');
    }
  };

  return (
    <div className="otp-container">
      <h2 className="otp-title">Verify OTP</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          required
          className="otp-input"
        />
        <button type="submit" className="otp-button">Verify OTP</button>
      </form>
      {message && <p className="otp-message">{message}</p>}
    </div>
  );
};

export default OtpVerifyForm;
