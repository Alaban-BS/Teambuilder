export interface Team {
  id: string;
  name: string;
  maxPlayers: number;
  players: string[];
  staff: string[];
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  position: string;
  teamId?: string;
  age?: number;
  email?: string;
  phone?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  teamId?: string;
}

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface TeamAssignment {
  teamId: string;
  players: string[];
  staff: string[];
}

export interface Scenario {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'archived';
  teamAssignments: TeamAssignment[];
  lastUpdated: string;
  createdBy: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'tc' | 'coordinator';
  email: string;
}

export interface UserWithPassword extends User {
  passwordHash: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  overlay?: boolean;
}
