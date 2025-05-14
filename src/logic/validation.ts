import { Player, Team, ValidationResult } from '../types';

export const validatePlayerAssignment = (
  player: Player,
  team: Team,
  currentPlayers: Player[]
): ValidationResult => {
  // Check team capacity
  if (currentPlayers.length >= team.maxPlayers) {
    return {
      status: 'error',
      message: 'Team is at maximum capacity',
    };
  }

  // Use player.age directly
  if (typeof player.age === 'number' && (player.age < team.minAge || player.age > team.maxAge)) {
    return {
      status: 'error',
      message: `Player age (${player.age}) is outside team range (${team.minAge}-${team.maxAge})`,
    };
  }

  // Check for duplicate assignment
  if (currentPlayers.some(p => p.id === player.id)) {
    return {
      status: 'error',
      message: 'Player is already assigned to this team',
    };
  }

  // Check gender balance (if needed)
  const genderCount = currentPlayers.filter(p => p.gender === player.gender).length;
  if (genderCount > Math.ceil(team.maxPlayers / 2)) {
    return {
      status: 'error',
      message: 'Team gender balance might be affected',
    };
  }

  return {
    status: 'valid',
    message: 'Assignment is valid',
  };
};

export const validateTeamComposition = (team: Team, players: Player[]): ValidationResult[] => {
  const validations: ValidationResult[] = [];

  // Check total capacity
  if (players.length > team.maxPlayers) {
    validations.push({
      status: 'error',
      message: `Team exceeds maximum capacity (${players.length}/${team.maxPlayers})`,
    });
  }

  // Check age distribution using player.age
  const invalidAges = players.filter(p => typeof p.age === 'number' && (p.age < team.minAge || p.age > team.maxAge));

  if (invalidAges.length > 0) {
    validations.push({
      status: 'error',
      message: `${invalidAges.length} players have invalid ages`,
    });
  }

  // Check gender balance
  const genderCounts = players.reduce((acc, player) => {
    acc[player.gender] = (acc[player.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxGenderCount = Math.ceil(team.maxPlayers / 2);
  Object.entries(genderCounts).forEach(([gender, count]) => {
    if (count > maxGenderCount) {
      validations.push({
        status: 'error',
        message: `Too many ${gender} players (${count})`,
      });
    }
  });

  return validations;
};
