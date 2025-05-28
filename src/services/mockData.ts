import { Player, Scenario, Season, Staff, Team, User } from '../types/index';

// Helper function to generate random number within range
const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Mock Players
export const mockPlayers: Player[] = Array.from({ length: 20 }, (_, i) => ({
  id: `player-${i + 1}`,
  firstName: `Player${i + 1}`,
  lastName: `Last${i + 1}`,
  name: `Player${i + 1} Last${i + 1}`,
  gender: i % 2 === 0 ? 'male' : 'female',
  birthDate: new Date(2000 - randomNumber(0, 10), randomNumber(0, 11), randomNumber(1, 28)).toISOString(),
  profileImage: null,
  status: 'active',
  federationNumber: `FED${1000 + i}`,
  position: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'][i % 4],
  teamId: i < 10 ? `team-${Math.floor(i / 2) + 1}` : undefined,
  age: randomNumber(18, 35),
  email: `player${i + 1}@example.com`,
  phone: `+1234567890${i}`,
  notes: ''
}));

// Mock Teams
export const mockTeams: Team[] = Array.from({ length: 5 }, (_, i) => ({
  id: `team-${i + 1}`,
  name: `Team ${i + 1}`,
  location: `City ${i + 1}`,
  maxPlayers: 20,
  minAge: 18,
  maxAge: 35,
  players: mockPlayers.filter(p => p.teamId === `team-${i + 1}`).map(p => p.id),
  staff: []
}));

// Mock Staff
export const mockStaff: Staff[] = Array.from({ length: 10 }, (_, i) => ({
  id: `staff-${i + 1}`,
  firstName: `Staff${i + 1}`,
  lastName: `Last${i + 1}`,
  name: `Staff${i + 1} Last${i + 1}`,
  role: ['coach', 'manager', 'other'][i % 3] as 'coach' | 'manager' | 'other',
  email: `staff${i + 1}@example.com`,
  phone: `+1234567890${i}`,
  status: 'active',
  assignedTeams: [mockTeams[i % mockTeams.length].id],
  qualifications: ['License A', 'License B'],
  notes: ''
}));

// Mock Seasons
export const mockSeasons: Season[] = [
  {
    id: 'season-1',
    name: '2024 Spring Season',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'upcoming',
    registrationDeadline: '2024-02-15',
    maxTeams: 8,
    ageGroups: ['U18', 'U21', 'Senior'],
    isActive: true,
    notes: ''
  },
  {
    id: 'season-2',
    name: '2024 Fall Season',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    status: 'upcoming',
    registrationDeadline: '2024-08-15',
    maxTeams: 8,
    ageGroups: ['U18', 'U21', 'Senior'],
    isActive: false,
    notes: ''
  }
];

// Mock Scenarios
export const mockScenarios: Scenario[] = [
  {
    id: 'scenario-1',
    name: 'Spring Teams',
    description: 'Initial team assignments for Spring 2024 season.',
    status: 'draft',
    seasonId: 'season-1',
    teamAssignments: mockTeams.map(team => ({
      teamId: team.id,
      players: team.players,
      staff: team.staff || []
    })),
    lastUpdated: new Date().toISOString(),
    createdBy: 'admin',
    teams: mockTeams.map(team => team.id)
  },
  {
    id: 'scenario-2',
    name: 'Fall Teams',
    description: 'Initial team assignments for Fall 2024 season.',
    status: 'draft',
    seasonId: 'season-2',
    teamAssignments: mockTeams.map(team => ({
      teamId: team.id,
      players: team.players,
      staff: team.staff || []
    })),
    lastUpdated: new Date().toISOString(),
    createdBy: 'admin',
    teams: mockTeams.map(team => team.id)
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: 'user-2',
    username: 'manager',
    email: 'manager@example.com',
    role: 'manager'
  },
  {
    id: 'user-3',
    username: 'coordinator',
    email: 'coordinator@example.com',
    role: 'coordinator'
  }
];
