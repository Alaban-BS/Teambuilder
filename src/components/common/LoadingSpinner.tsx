import React from 'react';
import { useApp } from '../../contexts/AppContext';
import '../../styles/LoadingSpinner.css';

export function LoadingSpinner() {
  const { state } = useApp();
  const { isLoading, message } = state.loading;

  if (!isLoading) return null;

  return (
    <div className="loading-spinner-overlay" role="alert" aria-busy="true">
      <div className="loading-spinner-container">
        <div className="loading-spinner" />
        {message && <p className="loading-message">{message}</p>}
      </div>
    </div>
  );
} 