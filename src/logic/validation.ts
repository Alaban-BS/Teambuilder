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

  // Calculate player age
  const playerAge = new Date().getFullYear() - new Date(player.birthDate).getFullYear();

  // Check age requirements
  if (playerAge < team.minAge || playerAge > team.maxAge) {
    return {
      status: 'error',
      message: `Player age (${playerAge}) is outside team range (${team.minAge}-${team.maxAge})`,
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
      status: 'warning',
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

  // Check age distribution
  const ageDistribution = players.map(p => 
    new Date().getFullYear() - new Date(p.birthDate).getFullYear()
  );
  
  const invalidAges = ageDistribution.filter(age => 
    age < team.minAge || age > team.maxAge
  );

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
        status: 'warning',
        message: `Too many ${gender === 'M' ? 'male' : 'female'} players (${count})`,
      });
    }
  });

  return validations;
}; 