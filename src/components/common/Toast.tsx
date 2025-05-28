import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Toast as ToastType } from '../../types/index';
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
    <div className={`toast ${toast.type}`}>
      {toast.message}
    </div>
  );
}

export const ToastContainer: React.FC = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const timers = state.toasts.map((toast: ToastType) => {
      if (toast.duration) {
        return setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', payload: toast.id });
        }, toast.duration);
      }
      return null;
    });

    return () => {
      timers.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [state.toasts, dispatch]);

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {state.toasts.map((toast: ToastType) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}; 