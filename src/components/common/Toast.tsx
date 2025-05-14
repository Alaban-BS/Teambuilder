import React, { useEffect } from 'react';
import { Toast as ToastType } from '../../types/common';
import { useApp } from '../../contexts/AppContext';
import '../../styles/Toast.css';

export function Toast({ toast }: { toast: ToastType }) {
  const { dispatch } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: toast.id });
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dispatch]);

  return (
    <div className={`toast toast-${toast.type}`} role="alert">
      <div className="toast-content">
        <span className="toast-message">{toast.message}</span>
        <button
          className="toast-close"
          onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export const ToastContainer: React.FC = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const timers = state.toasts.map(toast => {
      if (toast.duration) {
        return setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', payload: toast.id });
        }, toast.duration);
      }
      return null;
    });

    return () => {
      timers.forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [state.toasts, dispatch]);

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {state.toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}; 