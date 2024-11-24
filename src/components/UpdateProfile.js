import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    residential_address: '',
    pincode: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile", error);
        setError('Error fetching profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.contact_no || !formData.residential_address || !formData.pincode) {
      setError('Please fill out all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await axios.put('/api/profile/update/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      setError('Failed to update profile!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <form className="update-profile-form" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label>Contact Number</label>
          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            placeholder="Enter your contact number"
          />
        </div>

        <div>
          <label>Residential Address</label>
          <textarea
            name="residential_address"
            value={formData.residential_address}
            onChange={handleChange}
            placeholder="Enter your residential address"
          />
        </div>

        <div>
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter your pincode"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
