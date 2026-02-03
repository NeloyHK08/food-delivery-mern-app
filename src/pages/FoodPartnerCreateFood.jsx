import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import '../styles/createfood.css';

const FoodPartnerCreateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      video: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.video) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('name', formData.name);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('video', formData.video);

      const response = await axiosInstance.post('/api/food', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Food created:', response.data);
      setMessage('Food item created successfully!');
      setFormData({
        name: '',
        description: '',
        video: null,
      });
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error creating food:', error);
      setMessage(error.response?.data?.message || 'Failed to create food item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-food-container">
      <div className="create-food-wrapper">
        <div className="create-food-header">
          <h1>Create Food Item</h1>
          <p>Upload a video of your food with description</p>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Food Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g., Margherita Pizza"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Describe your food item..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="video" className="form-label">
              Video
            </label>
            <div className="video-input-wrapper">
              <input
                id="video"
                type="file"
                accept="video/*"
                className="form-input-file"
                onChange={handleVideoChange}
                required
              />
              <label htmlFor="video" className="video-input-label">
                <span className="upload-icon">📹</span>
                <span className="upload-text">
                  {formData.video ? formData.video.name : 'Click to select video'}
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Food Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerCreateFood;

