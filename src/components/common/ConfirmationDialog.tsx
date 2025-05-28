import React from 'react';
import { useApp } from '../../contexts/AppContext';
import '../../styles/ConfirmationDialog.css';

export const ConfirmationDialog: React.FC = () => {
  const { state, dispatch } = useApp();
  const { isOpen, title, message, onConfirm, onCancel } = state.confirmationDialog;

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    dispatch({ type: 'HIDE_CONFIRMATION_DIALOG' });
  };

  const handleCancel = () => {
    onCancel();
    dispatch({ type: 'HIDE_CONFIRMATION_DIALOG' });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}; 