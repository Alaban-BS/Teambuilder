import { useState } from 'react';
import { Player, Team } from '../types';

interface UsePlayerAssignmentProps {
  teams: Team[];
  onPlayerMove: (playerId: string, fromTeamId: string | undefined, toTeamId: string) => void;
}

export const usePlayerAssignment = ({ teams, onPlayerMove }: UsePlayerAssignmentProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [targetTeam, setTargetTeam] = useState<Team | null>(null);

  const handlePlayerAssignment = (player: Player, toTeam: Team) => {
    // Find the current team the player is assigned to
    const currentTeam = teams.find(team => team.players.includes(player.id));

    // If player is already in the target team, do nothing
    if (currentTeam?.id === toTeam.id) return;

    // If player is assigned to another team, show confirmation dialog
    if (currentTeam) {
      setSelectedPlayer(player);
      setTargetTeam(toTeam);
      setIsDialogOpen(true);
    } else {
      // If player is not assigned to any team, move directly
      onPlayerMove(player.id, undefined, toTeam.id);
    }
  };

  const handleConfirm = () => {
    if (selectedPlayer && targetTeam) {
      const currentTeam = teams.find(team => team.players.includes(selectedPlayer.id));
      onPlayerMove(selectedPlayer.id, currentTeam?.id, targetTeam.id);
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