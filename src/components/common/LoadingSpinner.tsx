import React from 'react';
import '../../styles/LoadingSpinner.css';
import { LoadingSpinnerProps } from '../../types/index';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#000',
  className = ''
}) => {
  return (
    <div className={`loading-spinner ${size} ${className}`} style={{ borderTopColor: color }}>
      <div className="spinner"></div>
    </div>
  );
}; 