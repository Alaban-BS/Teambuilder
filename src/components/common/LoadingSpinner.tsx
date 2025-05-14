import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { LoadingSpinnerProps } from '../../types';
import '../../styles/LoadingSpinner.css';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#4a90e2',
  overlay = false
}) => {
  const { state } = useApp();

  if (!state.isLoading) return null;

  return (
    <div className={`loading-spinner-container ${overlay ? 'overlay' : ''}`}>
      <div
        className={`loading-spinner ${size}`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
}; 