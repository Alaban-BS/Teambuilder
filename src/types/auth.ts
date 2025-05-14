export type UserRole = 'admin' | 'tc';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  passwordHash: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
} 