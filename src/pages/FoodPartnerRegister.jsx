import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axiosInstance from '../api/axiosConfig';

const FoodPartnerRegister = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Restaurant Name:', formData.restaurantName);
    console.log('Owner Name:', formData.ownerName);
    console.log('Email:', formData.email);
    console.log('Phone:', formData.phone);
    console.log('Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
    console.log('Agree to Terms:', formData.agreeToTerms);
    console.log('Form Data:', formData);

    try {
      const response = await axiosInstance.post('/api/auth/food-partner/register', {
        restaurantName: formData.restaurantName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      console.log('Registration successful:', response.data);
      // Redirect to food partner create food page after successful registration
      navigate('/food-partner-create');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <div className="auth-badge">Partner Register</div>
          <h1>Grow Your Business</h1>
          <p>Register your restaurant to reach more customers</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="role-switcher">
            <span className="role-label">Register as:</span>
            <Link to="/user/register" className="role-switcher-btn">
              Customer
            </Link>
            <span className="role-switcher-btn active">
              Food Partner
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="restaurantName" className="form-label">
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              type="text"
              name="restaurantName"
              className="form-input"
              placeholder="Your Restaurant"
              value={formData.restaurantName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerName" className="form-label">
              Owner Name
            </label>
            <input
              id="ownerName"
              type="text"
              name="ownerName"
              className="form-input"
              placeholder="Your Name"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="contact@restaurant.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              className="form-input"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-checkbox">
            <input
              id="agreeToTerms"
              type="checkbox"
              name="agreeToTerms"
              className="checkbox-input"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms" className="checkbox-label">
              I agree to the Partner Terms and Privacy Policy
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Register Restaurant
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already registered?
            <a href="/food-partner/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
