import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import '../styles/PlayerCard.css';
import { Player } from '../types';

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
          {player.age && <span className="player-age">{player.age} years</span>}
          {player.position && <span className="player-position">{player.position}</span>}
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
