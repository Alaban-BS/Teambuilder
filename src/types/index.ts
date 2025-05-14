export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  birthDate: string;
  profileImage: string | null;
  notes?: string;
  status: 'active' | 'inactive';
  federationNumber?: string;
}

export interface Team {
  id: string;
  name: string;
  maxPlayers: number;
  minAge: number;
  maxAge: number;
}

export interface TeamAssignment {
  teamId: string;
  players: string[];
}

export interface Scenario {
  id: string;
  name: string;
  status: 'draft' | 'final' | 'archived';
  teams: TeamAssignment[];
  lastUpdated: string;
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
  role: 'coach' | 'assistant' | 'manager' | 'trainer';
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
  ageGroups: {
    minAge: number;
    maxAge: number;
  }[];
  notes?: string;
}

export type ValidationStatus = 'valid' | 'warning' | 'error';

export interface ValidationResult {
  status: ValidationStatus;
  message: string;
} 