import { DragEndEvent } from '@dnd-kit/core';
import { useCallback, useState } from 'react';
import { Player, Team } from '../types';
import { ValidationResult } from '../types/index';

interface TeamAssignmentState {
  [teamId: string]: string[];
}

export const useTeamAssignment = (teams: Team[]) => {
  const [assignments, setAssignments] = useState<TeamAssignmentState>({});

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

    if (player.age && (player.age < team.minAge || player.age > team.maxAge)) {
      return {
        status: 'error',
        message: `Player age (${player.age}) is outside team's age range (${team.minAge}-${team.maxAge})`,
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
      if (player && player.age) {
        if (player.age < team.minAge || player.age > team.maxAge) {
          validations.push({
            status: 'error',
            message: `${player.firstName} ${player.lastName} (age ${player.age}) is outside team's age range (${team.minAge}-${team.maxAge})`,
          });
        }
      }
    });

    return validations;
  }, [teams, assignments]);

  return {
    assignments,
    handleDragEnd,
    assignPlayer,
    removePlayer,
    getTeamValidation,
  };
};

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
