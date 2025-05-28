export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  profileImage: string | null;
  notes?: string;
  status: 'active' | 'inactive';
  federationNumber: string;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  location: string;
  maxPlayers: number;
  minAge: number;
  maxAge: number;
  players: string[];
  staff: string[];
}

export interface TeamAssignment {
  teamId: string;
  players: string[];
  staff: string[];
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'final' | 'archived';
  seasonId: string;
  teamAssignments: TeamAssignment[];
  lastUpdated: string;
  createdBy: string;
  teams: string[];
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  role: 'coach' | 'manager' | 'other';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  assignedTeams: string[]; // Array of team IDs
  qualifications: string[];
  notes?: string;
}

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  registrationDeadline: string;
  maxTeams: number;
  ageGroups: string[];
  isActive: boolean;
  notes?: string;
}

export type ValidationStatus = 'valid' | 'warning' | 'error';

export interface ValidationResult {
  status: ValidationStatus;
  message: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'coordinator';
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
} 