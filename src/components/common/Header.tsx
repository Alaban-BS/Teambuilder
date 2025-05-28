import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import '../../styles/Header.css';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { state } = useApp();

  const canAccessConfig = currentUser?.role === 'admin' || currentUser?.role === 'manager';

  return (
    <header className="header">
      <div className="header-content">
        <h1>Team Builder</h1>
        <div className="header-actions">
          {canAccessConfig && (
            <button className="config-button">Configuration</button>
          )}
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}; 