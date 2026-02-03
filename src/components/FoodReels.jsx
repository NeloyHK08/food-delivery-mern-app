import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axiosConfig';
import '../styles/reels.css';

const FoodReels = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/food');
        console.log('Food items fetched:', response.data);
        setFoodItems(response.data.foodItems || []);
      } catch (err) {
        console.error('Error fetching food items:', err);
        setError('Failed to load food items');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  if (loading) {
    return (
      <div className="reels-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || foodItems.length === 0) {
    return (
      <div className="reels-empty">
        <h2>No Food Items Yet</h2>
        <p>{error || 'Check back later for delicious food!'}</p>
      </div>
    );
  }

  return (
    <div className="reels-container" ref={containerRef}>
      {foodItems.map((food, index) => (
        <div key={food._id} className="reel">
          <div className="reel-video-wrapper">
            <video
              className="reel-video"
              src={food.video}
              preload="metadata"
              controls
              playsInline
              onError={(e) => console.error(`Video ${index} failed to load:`, food.video, e)}
              onLoadedMetadata={() => console.log(`Video ${index} loaded successfully:`, food.video)}
            />
          </div>
          <div className="reel-overlay">
            {food.name && <p className="reel-name">{food.name}</p>}
            {food.description && <p className="reel-description">{food.description}</p>}
            <button className="visit-store-btn">Visit Store</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodReels;
