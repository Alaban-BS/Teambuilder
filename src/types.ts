export interface Team {
  id: string;
  name: string;
  maxPlayers: number;
  minAge: number;
  maxAge: number;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  federationNumber?: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  assignedTeams: string[];
  qualifications: string[];
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
  notes?: string;
}

export interface TeamAssignment {
  teamId: string;
  playerIds: string[];
}

export interface Scenario {
  id: string;
  name: string;
  status: 'draft' | 'final' | 'archived';
  teams: TeamAssignment[];
  lastUpdated: string;
  createdBy: string; // User ID of the creator
} 