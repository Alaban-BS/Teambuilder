import React from 'react';
import { useApp } from '../../contexts/AppContext';
import '../../styles/ConfirmationDialog.css';

export const ConfirmationDialog: React.FC = () => {
  const { state, dispatch } = useApp();
  const { isOpen, title, message, onConfirm, onCancel } = state.confirmationDialog;

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    dispatch({ type: 'HIDE_CONFIRMATION_DIALOG' });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    dispatch({ type: 'HIDE_CONFIRMATION_DIALOG' });
  };

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button
            className="confirmation-dialog-button cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="confirmation-dialog-button confirm"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}; 