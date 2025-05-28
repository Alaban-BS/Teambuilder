import demoPlayers from './demo-players.json';
import demoTeams from './demo-teams.json';
import demoStaff from './demo-staff.json';
import demoSeasons from './demo-seasons.json';
import demoScenarios from './demo-scenarios.json';
import { Team, Player, Staff, Season, Scenario, TeamAssignment } from '../../types';

// Transform and type the data
const testTeams: Team[] = demoTeams.teams.map(team => ({
  ...team,
  players: team.players || [],
  staff: team.staff || []
}));

const testPlayers: Player[] = demoPlayers.players.map(player => ({
  ...player,
  firstName: player.firstName || '',
  lastName: player.lastName || '',
  name: `${player.firstName || ''} ${player.lastName || ''}`.trim(),
  gender: (player.gender || 'male') as 'male' | 'female' | 'other',
  birthDate: player.birthDate || new Date().toISOString(),
  profileImage: player.profileImage || null,
  status: (player.status || 'active') as 'active' | 'inactive',
  federationNumber: player.federationNumber || '',
  teamId: player.teamId || undefined,
  age: player.age || undefined,
  notes: player.notes || ''
}));

const testStaff: Staff[] = demoStaff.staff.map(staff => ({
  ...staff,
  firstName: staff.firstName || '',
  lastName: staff.lastName || '',
  name: `${staff.firstName || ''} ${staff.lastName || ''}`.trim(),
  role: (staff.role || 'other') as 'coach' | 'manager' | 'other',
  email: staff.email || '',
  phone: staff.phone || '',
  status: (staff.status || 'active') as 'active' | 'inactive',
  assignedTeams: staff.assignedTeams || [],
  qualifications: staff.qualifications || [],
  notes: staff.notes || ''
}));

const testSeasons: Season[] = demoSeasons.seasons.map(season => ({
  ...season,
  id: season.id || '',
  name: season.name || '',
  startDate: season.startDate || new Date().toISOString(),
  endDate: season.endDate || new Date().toISOString(),
  status: (season.status || 'upcoming') as 'upcoming' | 'active' | 'completed',
  registrationDeadline: season.registrationDeadline || new Date().toISOString(),
  maxTeams: season.maxTeams || 8,
  ageGroups: season.ageGroups || [],
  isActive: season.isActive || false,
  notes: season.notes || ''
}));

const testScenarios: Scenario[] = demoScenarios.scenarios.map(scenario => ({
  ...scenario,
  id: scenario.id || '',
  name: scenario.name || '',
  description: scenario.description || '',
  status: (scenario.status || 'draft') as 'draft' | 'final' | 'archived',
  seasonId: scenario.seasonId || '',
  teamAssignments: scenario.teamAssignments.map(assignment => ({
    teamId: assignment.teamId,
    players: assignment.players || [],
    staff: assignment.staff || []
  })),
  lastUpdated: scenario.lastUpdated || new Date().toISOString(),
  createdBy: scenario.createdBy || '',
  teams: scenario.teams || []
}));

export {
  testTeams,
  testPlayers,
  testStaff,
  testSeasons,
  testScenarios
}; 