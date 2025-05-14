import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Toast, LoadingState, ErrorState, ConfirmationDialog, Session } from '../types/common';

interface AppState {
  toasts: Toast[];
  loading: LoadingState;
  error: ErrorState;
  confirmationDialog: ConfirmationDialog;
  session: Session | null;
}

type AppAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'SET_LOADING'; payload: LoadingState }
  | { type: 'SET_ERROR'; payload: ErrorState }
  | { type: 'SET_CONFIRMATION_DIALOG'; payload: ConfirmationDialog }
  | { type: 'SET_SESSION'; payload: Session | null };

const initialState: AppState = {
  toasts: [],
  loading: { isLoading: false },
  error: { hasError: false },
  confirmationDialog: {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  },
  session: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_CONFIRMATION_DIALOG':
      return {
        ...state,
        confirmationDialog: action.payload,
      };
    case 'SET_SESSION':
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 