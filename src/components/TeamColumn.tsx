import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import '../styles/TeamColumn.css';
import { Player, Team } from '../types';
import { ValidationResult } from '../types/index';
import { PlayerCard } from './PlayerCard';

interface TeamColumnProps {
  team: Team;
  players: Player[];
  onPlayerDrop: (player: Player, teamId: string) => ValidationResult | undefined;
  onPlayerRemove: (playerId: string) => void;
  validations: ValidationResult[];
}

export const TeamColumn: React.FC<TeamColumnProps> = ({
  team,
  players,
  onPlayerDrop,
  onPlayerRemove,
  validations,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: team.id,
  });

  const capacityPercentage = (players.length / team.maxPlayers) * 100;
  const hasErrors = validations.some(v => v.status === 'error');
  const hasWarnings = validations.some(v => v.status === 'warning');

  return (
    <div
      ref={setNodeRef}
      className={`team-column ${isOver ? 'drop-target' : ''} ${
        hasErrors ? 'has-errors' : hasWarnings ? 'has-warnings' : ''
      }`}
    >
      <div className="team-header">
        <h3>{team.name}</h3>
        <div className="team-info">
          <div className="capacity">
            <div className="capacity-bar">
              <div
                className="capacity-fill"
                style={{ width: `${capacityPercentage}%` }}
              />
            </div>
            <span>
              {players.length}/{team.maxPlayers} players
            </span>
          </div>
          <div className="age-range">
            Ages {team.minAge}-{team.maxAge}
          </div>
        </div>
      </div>

      {validations.length > 0 && (
        <div className="validation-messages">
          {validations.map((validation, index) => (
            <div
              key={index}
              className={`validation-message ${validation.status}`}
            >
              {validation.message}
            </div>
          ))}
        </div>
      )}

      <div className="players-list">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onRemove={() => onPlayerRemove(player.id)}
          />
        ))}
      </div>
    </div>
  );
};
