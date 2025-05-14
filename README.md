# Team Assignment Tool

A comprehensive web application for managing team assignments, scenarios, and player distributions. Built with React and TypeScript.

## Features

### Core Features
- Team Management (CRUD operations)
- Player Management (CRUD operations)
- Staff Management (CRUD operations)
- Season Management (CRUD operations)
- Scenario Management (CRUD operations)
- Drag-and-drop team assignment
- Team assignment validation

### Advanced Features
- Undo/Redo functionality for team assignments
- Local storage persistence
- Toast notifications
- Loading states
- Confirmation dialogs
- Data table with pagination, sorting, and filtering
- Role-based access control
- Session management

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Toast.tsx
│   │   ├── ConfirmationDialog.tsx
│   │   └── LoadingSpinner.tsx
│   ├── TCDashboard.tsx
│   ├── TeamColumn.tsx
│   └── PlayerCard.tsx
├── contexts/
│   └── AppContext.tsx
├── hooks/
│   ├── useDataTable.ts
│   ├── useLocalStorage.ts
│   ├── useTeamAssignment.ts
│   └── useUndoRedo.ts
├── styles/
│   ├── global.css
│   ├── Toast.css
│   ├── ConfirmationDialog.css
│   └── LoadingSpinner.css
├── types/
│   ├── index.ts
│   └── common.ts
├── utils/
│   └── helpers.ts
└── App.tsx
```

## Components

### Common Components

#### Toast
- Displays temporary notifications
- Supports success, error, info, and warning types
- Auto-dismisses after configurable duration
- Accessible with ARIA attributes

#### ConfirmationDialog
- Modal dialog for confirming actions
- Customizable title and message
- Confirm and cancel actions
- Accessible with ARIA attributes

#### LoadingSpinner
- Global loading indicator
- Optional loading message
- Accessible with ARIA attributes
- Centered overlay design

### Main Components

#### TCDashboard
- Main interface for team coordinators
- Manages teams, players, staff, seasons, and scenarios
- Role-based access control
- Scenario duplication and management

#### TeamColumn
- Displays team information
- Handles player assignments
- Shows validation status
- Drag-and-drop support

#### PlayerCard
- Displays player information
- Draggable for team assignment
- Shows player status and details

## Hooks

### useDataTable
- Manages data table state
- Handles pagination
- Supports sorting
- Implements filtering
- Memoized calculations

### useLocalStorage
- Persists data in localStorage
- Syncs across tabs
- Type-safe implementation
- Error handling

### useTeamAssignment
- Manages team-player assignments
- Handles drag-and-drop
- Validates assignments
- Maintains assignment state

### useUndoRedo
- Implements undo/redo functionality
- Maintains history stack
- Type-safe implementation
- Optimized performance

## Context

### AppContext
- Global state management
- Toast notifications
- Loading states
- Error handling
- Confirmation dialogs
- Session management

## Types

### Core Types
- Team
- Player
- Staff
- Season
- Scenario
- TeamAssignment

### Common Types
- Toast
- LoadingState
- ErrorState
- ConfirmationDialog
- PaginationState
- SortState
- FilterState
- UserRole
- Session

## Utils

### Helpers
- ID generation
- Toast creation
- Data filtering
- Data sorting
- Pagination
- Input sanitization
- Email validation
- Phone validation
- Date formatting
- Debounce/Throttle

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Available Scripts
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm lint`: Run linter

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.