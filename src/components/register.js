import React, { useState } from "react";
import "./register.css"; // CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the hook

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    contact_no: "",
    residential_address: "",
    pincode: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/authapp/register/", formData);
      
      // Assuming the response contains the user ID in the data
      const userId = response.data.user_id;

      // Redirect to OTP verification page with user ID
      navigate(`/verify-otp/${userId}`);

    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred during registration.");
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact_no"
          placeholder="Contact Number"
          value={formData.contact_no}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="residential_address"
          placeholder="Residential Address"
          value={formData.residential_address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
