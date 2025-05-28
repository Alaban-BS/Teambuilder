# Player Assignment Functionality

## Overview
The player assignment system ensures that players can only be assigned to one team **within a scenario**. Assignments are not global: the player database contains only player information, and all team assignments are managed per scenario. When attempting to assign a player to a new team within a scenario while they are already assigned to another team in that scenario, a confirmation dialog will appear to confirm the move.

## Scenario-Specific Assignments
- **Players are not assigned to teams globally.**
- **All assignments are stored in the `teamAssignments` array of the active scenario.**
- **Within a scenario, a player can only be assigned to one team.**
- The player database (`players`) is only for player info (name, age, etc.), not assignments.

## Components

### PlayerAssignmentDialog
A reusable dialog component that handles the confirmation process when moving a player between teams **within a scenario**.

**Props:**
- `isOpen: boolean` - Controls the visibility of the dialog
- `player: Player | null` - The player being moved
- `currentTeam: Team | null` - The player's current team in the scenario (if any)
- `targetTeam: Team | null` - The team the player is being moved to
- `onConfirm: () => void` - Callback when the move is confirmed
- `onCancel: () => void` - Callback when the move is cancelled
- `onClose: () => void` - Callback when the dialog is closed

### usePlayerAssignment Hook
A custom hook that manages the player assignment state and logic **for the current scenario**.

**Parameters:**
- `teamAssignments: TeamAssignment[]` - Array of team assignments for the current scenario
- `onPlayerMove: (playerId: string, fromTeamId: string | undefined, toTeamId: string) => void` - Callback to handle the actual player move within the scenario

**Returns:**
- `isDialogOpen: boolean` - Whether the confirmation dialog is open
- `selectedPlayer: Player | null` - The player being moved
- `targetTeam: Team | null` - The target team
- `handlePlayerAssignment: (player: Player, targetTeam: Team) => void` - Initiates the assignment process
- `handleConfirm: () => void` - Confirms the move
- `handleCancel: () => void` - Cancels the move
- `handleClose: () => void` - Closes the dialog

## Usage

1. When a user attempts to assign a player to a team in a scenario:
   - If the player is not currently assigned to any team in that scenario, they are moved directly
   - If the player is already assigned to a team in that scenario, a confirmation dialog appears

2. The confirmation dialog shows:
   - The player's name
   - Their current team (if any, in the scenario)
   - The target team
   - Options to confirm or cancel the move

3. After confirmation:
   - The player is removed from their current team in the scenario
   - The player is added to the target team in the scenario
   - The dialog closes

## Implementation Details

- All assignment logic operates on the `teamAssignments` array of the active scenario.
- The player database is not modified for assignments.
- The dialog and assignment logic are scenario-specific.
- The dialog component is styled using Tailwind CSS for a consistent look and feel with the rest of the application.

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