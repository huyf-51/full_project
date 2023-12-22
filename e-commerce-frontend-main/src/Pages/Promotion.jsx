

import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Promotion.css';

// promotion page
const Promotion = () => {
  return (
    <div className="promotion-container">
      <div className="promotion-content">
        <h2>Special Offer!</h2>
        <p>Get up to 20% off on all online purchases. Limited time only.</p>
        <Link to="/">
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Promotion;