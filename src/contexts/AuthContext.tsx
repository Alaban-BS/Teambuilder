import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthState, User, LoginCredentials } from '../types/auth';
import { createToast } from '../utils/helpers';

// Initial users with hashed passwords (using bcrypt)
const initialUsers: User[] = [
  {
    id: '1',
    email: 'antjanlaban@gmail.com',
    role: 'tc',
    passwordHash: '$2b$10$YourHashedPasswordHere' // We'll update this with actual hash
  },
  {
    id: '2',
    email: 'admin',
    role: 'admin',
    passwordHash: '$2b$10$YourHashedPasswordHere' // We'll update this with actual hash
  }
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // In a real app, this would be an API call
      const user = initialUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // In a real app, we would verify the password hash
      // For now, we'll do a simple comparison
      if (credentials.password === '039600' && user.email === 'antjanlaban@gmail.com' ||
          credentials.password === '463100' && user.email === 'admin') {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        createToast('Login successful', 'success');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
      createToast('Login failed: ' + (error as Error).message, 'error');
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    createToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 