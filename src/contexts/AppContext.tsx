import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Toast } from '../types';

interface AppState {
  toasts: Toast[];
  isLoading: boolean;
  confirmationDialog: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
    onCancel: (() => void) | null;
  };
}

type AppAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SHOW_CONFIRMATION_DIALOG'; payload: Omit<AppState['confirmationDialog'], 'isOpen'> }
  | { type: 'HIDE_CONFIRMATION_DIALOG' };

const initialState: AppState = {
  toasts: [],
  isLoading: false,
  confirmationDialog: {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SHOW_CONFIRMATION_DIALOG':
      return {
        ...state,
        confirmationDialog: {
          ...action.payload,
          isOpen: true
        }
      };
    case 'HIDE_CONFIRMATION_DIALOG':
      return {
        ...state,
        confirmationDialog: {
          ...state.confirmationDialog,
          isOpen: false
        }
      };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 