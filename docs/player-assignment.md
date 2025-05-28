# Player Assignment Functionality

## Overview
The player assignment system ensures that players can only be assigned to one team at a time. When attempting to assign a player to a new team while they are already assigned to another team, a confirmation dialog will appear to confirm the move.

## Components

### PlayerAssignmentDialog
A reusable dialog component that handles the confirmation process when moving a player between teams.

**Props:**
- `isOpen: boolean` - Controls the visibility of the dialog
- `player: Player | null` - The player being moved
- `currentTeam: Team | null` - The player's current team (if any)
- `targetTeam: Team | null` - The team the player is being moved to
- `onConfirm: () => void` - Callback when the move is confirmed
- `onCancel: () => void` - Callback when the move is cancelled
- `onClose: () => void` - Callback when the dialog is closed

### usePlayerAssignment Hook
A custom hook that manages the player assignment state and logic.

**Parameters:**
- `teams: Team[]` - Array of all teams
- `onPlayerMove: (playerId: string, fromTeamId: string | undefined, toTeamId: string) => void` - Callback to handle the actual player move

**Returns:**
- `isDialogOpen: boolean` - Whether the confirmation dialog is open
- `selectedPlayer: Player | null` - The player being moved
- `targetTeam: Team | null` - The target team
- `handlePlayerAssignment: (player: Player, targetTeam: Team) => void` - Initiates the assignment process
- `handleConfirm: () => void` - Confirms the move
- `handleCancel: () => void` - Cancels the move
- `handleClose: () => void` - Closes the dialog

## Usage

1. When a user attempts to assign a player to a team:
   - If the player is not currently assigned to any team, they are moved directly
   - If the player is already assigned to a team, a confirmation dialog appears

2. The confirmation dialog shows:
   - The player's name
   - Their current team (if any)
   - The target team
   - Options to confirm or cancel the move

3. After confirmation:
   - The player is removed from their current team
   - The player is added to the target team
   - The player's `teamId` is updated
   - The dialog closes

## Implementation Details

The system uses a combination of React state management and TypeScript interfaces to ensure type safety and proper data handling. The dialog component is styled using Tailwind CSS for a consistent look and feel with the rest of the application.

## Error Handling

- If a player is not found, the move is cancelled
- If a team is not found, the move is cancelled
- The dialog can be closed at any time without making changes

## Future Improvements

Potential enhancements could include:
- Batch player moves
- Undo/redo functionality
- Assignment history tracking
- Team capacity limits
- Assignment validation rules 