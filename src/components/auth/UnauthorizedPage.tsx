import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/UnauthorizedPage.css';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}; 