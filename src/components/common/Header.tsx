import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import '../../styles/Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { dispatch } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        id: Date.now().toString(),
        type: 'success',
        message: 'Successfully logged out',
        duration: 3000
      }
    });
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">Teambuilder</h1>
        <div className="header-actions">
          <div className="user-info">
            <span>{user.email}</span>
            <span className="user-role">({user.role})</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}; 