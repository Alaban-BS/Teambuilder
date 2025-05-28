import React from 'react';
import { Player, Team } from '../../types';

interface PlayerAssignmentDialogProps {
  isOpen: boolean;
  player: Player | null;
  currentTeam: Team | null;
  targetTeam: Team | null;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

export const PlayerAssignmentDialog: React.FC<PlayerAssignmentDialogProps> = ({
  isOpen,
  player,
  currentTeam,
  targetTeam,
  onConfirm,
  onCancel,
  onClose,
}) => {
  if (!isOpen || !player || !targetTeam) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Player Assignment</h2>
        <p className="mb-4">
          {currentTeam
            ? `${player.firstName} ${player.lastName} is already assigned to ${currentTeam.name}. Do you want to move this player to ${targetTeam.name}?`
            : `Do you want to assign ${player.firstName} ${player.lastName} to ${targetTeam.name}?`}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}; 