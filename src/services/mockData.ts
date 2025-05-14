import { Player, Scenario, Season, Staff, Team, User } from '../types';

// Helper function to generate random number within range
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random name
const generateName = () => {
  const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Margaret', 'Karen', 'Nancy', 'Lisa', 'Betty'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  return {
    firstName: firstNames[randomInt(0, firstNames.length - 1)],
    lastName: lastNames[randomInt(0, lastNames.length - 1)]
  };
};

// Generate 200 players
export const mockPlayers: Player[] = Array.from({ length: 200 }, (_, index) => {
  const { firstName, lastName } = generateName();
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'];
  const position = positions[randomInt(0, positions.length - 1)];

  return {
    id: String(index + 1),
    firstName,
    lastName,
    gender,
    position,
    teamId: undefined,
    age: randomInt(16, 35),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `+1-${randomInt(200, 999)}-${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
  };
});

// Generate 10 standard teams
export const mockTeams: Team[] = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  name: `Team ${String.fromCharCode(65 + index)}`, // A through J
  maxPlayers: 20,
  players: [],
  staff: [],
  minAge: 16,
  maxAge: 35,
}));

// Generate 20 staff members
export const mockStaff: Staff[] = Array.from({ length: 20 }, (_, index) => {
  const { firstName, lastName } = generateName();
  const roles = ['Coach', 'Assistant Coach', 'Trainer', 'Manager', 'Physiotherapist'];

  return {
    id: String(index + 1),
    name: `${firstName} ${lastName}`,
    role: roles[randomInt(0, roles.length - 1)],
    teamId: undefined,
  };
});

// Generate 2 seasons
export const mockSeasons: Season[] = [
  {
    id: '1',
    name: '2024 Spring Season',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    isActive: true,
  },
  {
    id: '2',
    name: '2024 Fall Season',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    isActive: false,
  },
];

// Generate scenarios for each season
export const mockScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Spring Season Initial Assignment',
    status: 'active',
    teamAssignments: mockTeams.map(team => ({
      teamId: team.id,
      players: mockPlayers
        .filter(p => !p.teamId)
        .slice(0, 20)
        .map(p => p.id),
      staff: mockStaff
        .filter(s => !s.teamId)
        .slice(0, 2)
        .map(s => s.id),
    })),
    lastUpdated: new Date().toISOString(),
    createdBy: '1', // admin user
  },
  {
    id: '2',
    name: 'Fall Season Initial Assignment',
    status: 'draft',
    teamAssignments: mockTeams.map(team => ({
      teamId: team.id,
      players: [],
      staff: [],
    })),
    lastUpdated: new Date().toISOString(),
    createdBy: '1', // admin user
  },
];

// Users (keeping the existing admin and tc users)
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: 'tc',
  },
  // Add a coordinator user
  {
    id: '3',
    username: 'coordinator',
    email: 'coordinator@example.com',
    role: 'coordinator',
  },
];
