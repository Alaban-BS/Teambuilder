import { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useState } from 'react';
import { Player, Team, TeamAssignment, ValidationResult, ValidationStatus } from '../types';
import { useApp } from '../contexts/AppContext';

interface TeamAssignmentState {
  [teamId: string]: string[];
}

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

export const useTeamAssignment = () => {
  const { state } = useApp();
  const { teams, players } = state;
  const [assignments, setAssignments] = useState<TeamAssignmentState>({});
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const playerId = active.id as string;
      const teamId = over.id as string;

      setAssignments(prev => {
        const newAssignments = { ...prev };
        // Remove player from any existing team
        Object.keys(newAssignments).forEach(tId => {
          newAssignments[tId] = newAssignments[tId].filter(id => id !== playerId);
        });
        // Add player to new team
        newAssignments[teamId] = [...(newAssignments[teamId] || []), playerId];
        return newAssignments;
      });
    }
  }, []);

  const assignPlayer = useCallback((player: Player, teamId: string): ValidationResult | undefined => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return undefined;

    const currentPlayers = assignments[teamId] || [];
    if (currentPlayers.length >= team.maxPlayers) {
      return {
        status: 'error',
        message: 'Team is at maximum capacity',
      };
    }

    // Check age requirements
    const playerAge = calculateAge(player.birthDate);
    if (playerAge < team.minAge || playerAge > team.maxAge) {
      return {
        status: 'error',
        message: `Player age (${playerAge}) is outside team's age range (${team.minAge}-${team.maxAge})`,
      };
    }

    setAssignments(prev => {
      const newAssignments = { ...prev };
      // Remove player from any existing team
      Object.keys(newAssignments).forEach(tId => {
        newAssignments[tId] = newAssignments[tId].filter(id => id !== player.id);
      });
      // Add player to new team
      newAssignments[teamId] = [...(newAssignments[teamId] || []), player.id];
      return newAssignments;
    });

    return {
      status: 'valid',
      message: 'Player assigned successfully',
    };
  }, [teams, assignments]);

  const removePlayer = useCallback((playerId: string, teamId: string) => {
    setAssignments(prev => ({
      ...prev,
      [teamId]: (prev[teamId] || []).filter(id => id !== playerId),
    }));
  }, []);

  const getTeamValidation = useCallback((teamId: string, allPlayers: Player[]): ValidationResult[] => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return [];

    const teamPlayers = assignments[teamId] || [];
    const validations: ValidationResult[] = [];

    // Check team capacity
    if (teamPlayers.length > team.maxPlayers) {
      validations.push({
        status: 'error',
        message: `Team exceeds maximum capacity (${team.maxPlayers})`,
      });
    }

    // Check age requirements
    teamPlayers.forEach(playerId => {
      const player = allPlayers.find(p => p.id === playerId);
      if (player && player.birthDate) {
        const playerAge = calculateAge(player.birthDate);
        if (playerAge < team.minAge || playerAge > team.maxAge) {
          validations.push({
            status: 'error',
            message: `${player.firstName} ${player.lastName} (age ${playerAge}) is outside team's age range (${team.minAge}-${team.maxAge})`,
          });
        }
      }
    });

    return validations;
  }, [teams, assignments]);

  const validateTeamAssignment = useCallback((teamId: string, playerId: string): ValidationResult => {
    const team = teams.find((t: Team) => t.id === teamId);
    const player = players.find((p: Player) => p.id === playerId);

    if (!team || !player) {
      return {
        status: 'error' as ValidationStatus,
        message: 'Team or player not found'
      };
    }

    // Check if team is at capacity
    const currentTeamPlayers = players.filter((p: Player) => p.teamId === teamId);
    if (currentTeamPlayers.length >= team.maxPlayers) {
      return {
        status: 'error' as ValidationStatus,
        message: `Team is at maximum capacity (${team.maxPlayers} players)`
      };
    }

    // Check if player is already assigned to a team
    if (player.teamId) {
      return {
        status: 'error' as ValidationStatus,
        message: 'Player is already assigned to a team'
      };
    }

    // Check age requirements
    const playerAge = calculateAge(player.birthDate);
    if (playerAge < team.minAge || playerAge > team.maxAge) {
      return {
        status: 'error' as ValidationStatus,
        message: `Player age (${playerAge}) is outside team's age range (${team.minAge}-${team.maxAge})`
      };
    }

    return {
      status: 'success' as ValidationStatus,
      message: 'Assignment is valid'
    };
  }, [teams, players]);

  const validateTeamAssignments = useCallback((assignments: TeamAssignment[]): ValidationResult[] => {
    const validations: ValidationResult[] = [];

    assignments.forEach(assignment => {
      const team = teams.find((t: Team) => t.id === assignment.teamId);
      if (!team) {
        validations.push({
          status: 'error' as ValidationStatus,
          message: `Team ${assignment.teamId} not found`
        });
        return;
      }

      // Check team capacity
      if (assignment.players.length > team.maxPlayers) {
        validations.push({
          status: 'error' as ValidationStatus,
          message: `Team ${team.name} exceeds maximum capacity (${team.maxPlayers} players)`
        });
      }

      // Check age requirements for all players
      assignment.players.forEach(playerId => {
        const player = players.find((p: Player) => p.id === playerId);
        if (player) {
          const playerAge = calculateAge(player.birthDate);
          if (playerAge < team.minAge || playerAge > team.maxAge) {
            validations.push({
              status: 'error' as ValidationStatus,
              message: `${player.firstName} ${player.lastName} (age ${playerAge}) is outside team's age range (${team.minAge}-${team.maxAge})`
            });
          }
        }
      });
    });

    return validations;
  }, [teams, players]);

  return {
    assignments,
    handleDragEnd,
    assignPlayer,
    removePlayer,
    getTeamValidation,
    validateTeamAssignment,
    validateTeamAssignments,
    validationResults,
    setValidationResults
  };
};
