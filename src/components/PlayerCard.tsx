import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import '../styles/PlayerCard.css';
import { Player } from '../types/index';

interface PlayerCardProps {
  player: Player;
  onRemove?: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onRemove }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: player.id,
    data: player,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`player-card ${isDragging ? 'dragging' : ''}`}
    >
      <div className="player-info">
        <div className="player-name">
          {player.firstName} {player.lastName}
        </div>
        <div className="player-details">
          <span className="player-gender">{player.gender}</span>
          <span className="player-birthdate">{new Date(player.birthDate).toLocaleDateString()}</span>
        </div>
      </div>
      {onRemove && (
        <button className="remove-button" onClick={onRemove}>
          ×
        </button>
      )}
    </div>
  );
};
