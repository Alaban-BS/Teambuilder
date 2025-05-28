import { Player, Team, ValidationResult, ValidationStatus } from '../types/index';

// Helper function to calculate age from birthDate
const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const validatePlayerAssignment = (player: Player, team: Team): ValidationResult => {
  // Check if player is already assigned to a team
  if (player.teamId) {
    return {
      status: 'error' as ValidationStatus,
      message: 'Player is already assigned to a team'
    };
  }

  // Calculate age from birthDate and validate against team's age range
  const playerAge = calculateAge(player.birthDate);
  if (playerAge < team.minAge || playerAge > team.maxAge) {
    return {
      status: 'error' as ValidationStatus,
      message: `Player age (${playerAge}) is outside team range (${team.minAge}-${team.maxAge})`
    };
  }

  return {
    status: 'success' as ValidationStatus,
    message: 'Player assignment is valid'
  };
};

export const validateTeamComposition = (team: Team, players: Player[]): ValidationResult[] => {
  const validations: ValidationResult[] = [];

  // Check total capacity
  if (players.length > team.maxPlayers) {
    validations.push({
      status: 'error' as ValidationStatus,
      message: `Team exceeds maximum capacity (${players.length}/${team.maxPlayers})`
    });
  }

  // Check age distribution using birthDate
  const invalidAges = players.filter(p => {
    const playerAge = calculateAge(p.birthDate);
    return playerAge < team.minAge || playerAge > team.maxAge;
  });

  if (invalidAges.length > 0) {
    validations.push({
      status: 'error' as ValidationStatus,
      message: `${invalidAges.length} players have invalid ages`
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
        status: 'error' as ValidationStatus,
        message: `Too many ${gender} players (${count})`
      });
    }
  });

  return validations;
};
