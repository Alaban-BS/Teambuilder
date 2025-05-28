import { useState } from 'react';
import { Player, Team, TeamAssignment } from '../types';

interface UsePlayerAssignmentProps {
  teams: Team[];
  teamAssignments: TeamAssignment[];
  setTeamAssignments: (assignments: TeamAssignment[] | ((prev: TeamAssignment[]) => TeamAssignment[])) => void;
}

export const usePlayerAssignment = ({ teams, teamAssignments, setTeamAssignments }: UsePlayerAssignmentProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [targetTeam, setTargetTeam] = useState<Team | null>(null);

  // Find the team assignment for a player in the current scenario
  const findCurrentTeamAssignment = (playerId: string) => {
    return teamAssignments.find((ta: TeamAssignment) => ta.players.includes(playerId));
  };

  const handlePlayerAssignment = (player: Player, toTeam: Team) => {
    const currentAssignment = findCurrentTeamAssignment(player.id);
    // If player is already in the target team, do nothing
    if (currentAssignment?.teamId === toTeam.id) return;
    // If player is assigned to another team, show confirmation dialog
    if (currentAssignment) {
      setSelectedPlayer(player);
      setTargetTeam(toTeam);
      setIsDialogOpen(true);
    } else {
      // If player is not assigned to any team, move directly
      movePlayer(player.id, undefined, toTeam.id);
    }
  };

  const movePlayer = (playerId: string, fromTeamId: string | undefined, toTeamId: string) => {
    setTeamAssignments((prevAssignments: TeamAssignment[]) => {
      // Remove player from any team
      let newAssignments = prevAssignments.map((ta: TeamAssignment) => ({
        ...ta,
        players: ta.players.filter((id: string) => id !== playerId)
      }));
      // Add player to the target team
      newAssignments = newAssignments.map((ta: TeamAssignment) =>
        ta.teamId === toTeamId
          ? { ...ta, players: [...ta.players, playerId] }
          : ta
      );
      return newAssignments;
    });
  };

  const handleConfirm = () => {
    if (selectedPlayer && targetTeam) {
      const currentAssignment = findCurrentTeamAssignment(selectedPlayer.id);
      movePlayer(selectedPlayer.id, currentAssignment?.teamId, targetTeam.id);
      setIsDialogOpen(false);
      setSelectedPlayer(null);
      setTargetTeam(null);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedPlayer(null);
    setTargetTeam(null);
  };

  return {
    isDialogOpen,
    selectedPlayer,
    targetTeam,
    handlePlayerAssignment,
    handleConfirm,
    handleCancel,
    handleClose: handleCancel,
  };
}; 