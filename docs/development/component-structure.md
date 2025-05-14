# Component Structure

## Core Components

### App
**Purpose:** Root component for routing and global state
- Initializes context
- Manages global state
- Handles routing

### Sidebar
**Purpose:** Player list and filtering
- Search functionality
- Filter controls
- Player list rendering
- Draggable player cards

### ScenarioWorkspace
**Purpose:** Main workspace for team assignments
- Team columns layout
- Drop zone management
- Scenario controls
- Validation feedback

### TeamColumn
**Purpose:** Individual team container
- Drop zone for players
- Team information display
- Capacity indicators
- Validation status

### PlayerCard
**Purpose:** Draggable player representation
- Player information
- Status indicators
- Drag handle
- Validation warnings

### StaffCard
**Purpose:** Staff member representation
- Role selection
- Assignment status
- Drag functionality

## Helper Components

### UndoRedoControls
- Undo/Redo buttons
- Keyboard shortcuts
- History management

### ScenarioStatusBar
- Scenario information
- Action buttons
- Status indicators

### FederationCSVUploader
- CSV file upload
- Column mapping
- Validation feedback

### NoteTooltip
- Note display
- Hover/tap interaction
- Rich text support

## Component Hierarchy
```
App
├── Sidebar
│   ├── SearchBar
│   ├── FilterControls
│   └── PlayerList
│       └── PlayerCard
├── ScenarioWorkspace
│   ├── ScenarioStatusBar
│   ├── TeamColumn
│   │   ├── TeamHeader
│   │   ├── PlayerList
│   │   │   └── PlayerCard
│   │   └── StaffList
│   │       └── StaffCard
│   └── UndoRedoControls
└── FederationCSVUploader
``` 