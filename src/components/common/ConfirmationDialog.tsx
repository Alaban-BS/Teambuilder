import React from 'react';
import { useApp } from '../../contexts/AppContext';
import '../../styles/ConfirmationDialog.css';

export function ConfirmationDialog() {
  const { state, dispatch } = useApp();
  const { isOpen, title, message, onConfirm, onCancel } = state.confirmationDialog;

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    dispatch({
      type: 'SET_CONFIRMATION_DIALOG',
      payload: { ...state.confirmationDialog, isOpen: false },
    });
  };

  const handleCancel = () => {
    onCancel();
    dispatch({
      type: 'SET_CONFIRMATION_DIALOG',
      payload: { ...state.confirmationDialog, isOpen: false },
    });
  };

  return (
    <div className="confirmation-dialog-overlay" role="dialog" aria-modal="true">
      <div className="confirmation-dialog">
        <h3 className="confirmation-dialog-title">{title}</h3>
        <p className="confirmation-dialog-message">{message}</p>
        <div className="confirmation-dialog-actions">
          <button
            className="confirmation-dialog-button confirm"
            onClick={handleConfirm}
            aria-label="Confirm action"
          >
            Confirm
          </button>
          <button
            className="confirmation-dialog-button cancel"
            onClick={handleCancel}
            aria-label="Cancel action"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 