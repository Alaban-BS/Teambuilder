# 🧱 Architecture Overview – Team Assignment Builder

## 1. 📀 High-Level Architecture

The Team Assignment Builder is a **frontend-only web application** (MVP phase) built with **React + TypeScript**, optimized for modern browsers and tablets. The architecture is modular, scalable, and designed to support drag-and-drop interactions with visual validations.

```
+---------------------+
|     Web Client      |
|  (React Frontend)   |
+---------------------+
        |
        v
+---------------------+
|   Local JSON Files  |
|   (Flat Data Model) |
+---------------------+
```

> 🔧 Backend will be evaluated post-MVP. Currently, no server/database required.

---

## 2. 🧹 Component Structure

### Root Application
- `App.tsx`: Initializes global context/state

### Layout
- `Sidebar.tsx`: List of available players (with filters/search)
- `ScenarioWorkspace.tsx`: Container for active scenario

### Scenario Structure
- `TeamColumn.tsx`: Represents a team (dropzone)
- `PlayerCard.tsx`: Represents a player (draggable)
- `UndoRedoControls.tsx`: Enables undo/redo functionality

### Helpers
- `ValidationEngine.ts`: Rules for validating player assignments
- `useUndo.ts`: Custom hook or 3rd-party hook to manage history

---

## 3. 🎛️ State Management

- **Global State**: Managed via React Context API (single source of truth)
- **Scenario State**: Player/team assignments, scenario metadata, UI status
- **Persistent State**: Stored in `localStorage` or `IndexedDB` to allow reload recovery

---

## 4. 🔄 Data Flow

- Player/staff data is loaded from static **JSON files** at runtime (see section 8)
- Scenario changes trigger local updates + visual validations
- Undo/Redo is maintained as a stack in memory and optionally persisted
- Export functions generate CSV/Excel snapshots from current scenario state

---

## 5. 🧐 AI Integration (Cursor)

- Cursor AI is allowed to:
  - Create/refactor components
  - Add validation logic
  - Generate and update tests
  - Auto-adjust documentation (e.g., `DEV_GUIDELINES.md`, `README.md`)

> 🔁 Cursor should regularly check for inconsistencies between code and documentation.

---

## 6. 🚀 Deployment Targets

- Local development via `vite`
- Production hosting: to be selected (e.g., **Vercel**, **Netlify**)
- CI/CD: GitHub push-to-main triggers auto-deploy (solo dev, minimal pipeline)

---

## 7. 🔒 Authentication (Simple Mode)

- No backend required: login with email + admin-set pincode
- Failed login attempts tracked in memory or localStorage
- 3 failed attempts = 10-minute lockout (frontend-enforced)

---

## 8. 📦 Flat Data Model (JSON-based)

The app uses a JSON-based mock database as its data layer. All data is stored in static `.json` files:

> 🛠 In future releases, these files can be synchronized to a backend API for shared, multi-user editing.

### ✏️ Editing JSON via the App
- All changes made via the UI (adding/removing players, assigning teams, updating scenarios) can be written back to the JSON files using an API endpoint.
- A lightweight backend or serverless function can receive and overwrite the JSON files on the server.
- Optionally, a commit history or file versioning can be added to retain rollback capabilities.

### 🤝 Multi-user Considerations
- Use server timestamps (`lastUpdated`) to detect and prevent overwrite conflicts.
- Implement optimistic locking: only save if `lastUpdated` hasn't changed.
- Optionally show a warning if two users are editing the same scenario concurrently.
- For full real-time sync, a backend with WebSocket or Firestore-like capabilities can be considered later.

### `/data/players.json`
```json
[
  {
    "id": "p001",
    "firstName": "Sophie",
    "lastName": "Janssen",
    "gender": "F",
    "birthDate": "2012-04-15",
    "profileImage": null,
    "notes": "Informatie ontbreekt",
    "status": "active"
  }
]
```

### `/data/teams.json`
```json
[
  {
    "id": "t01",
    "name": "Team A",
    "maxPlayers": 10,
    "minAge": 10,
    "maxAge": 13
  }
]
```

### `/data/scenarios.json`
```json
[
  {
    "id": "s001",
    "name": "Voorjaar 2025",
    "status": "draft",
    "teams": [
      {
        "teamId": "t01",
        "players": ["p001", "p002"]
      }
    ],
    "lastUpdated": "2025-05-14T10:30:00Z"
  }
]
```

### `/data/staff.json`
```json
[
  {
    "id": "s001",
    "name": "Coach Mark",
    "roles": ["trainer", "teamleider"],
    "assignedTeamId": "t01"
  }
]
```

---

## 9. 📁 Folder Structure Example

```
/src
  /components
    App.tsx
    Sidebar.tsx
    ScenarioWorkspace.tsx
    PlayerCard.tsx
    TeamColumn.tsx
    UndoRedoControls.tsx
  /hooks
    useUndo.ts
  /logic
    ValidationEngine.ts
  /data
    players.json
    teams.json
    scenarios.json
    staff.json
  /styles
    *.css
  /tests
    *.test.tsx

## 10.  🧌 Data Model Overview

This section defines the core data model of the **Team Assignment Builder** application. It supports flexible team planning across seasons, accommodates both registered and unregistered players, and integrates with official federation validation processes.

---

### `Season`

Represents a seasonal planning cycle (e.g., "2025/2026"). Includes a reference date for accurate age calculations.

**Attributes:**

* `id`: Unique identifier
* `name`: Season name (e.g., "2025/2026")
* `startDate`, `endDate`: Season boundaries
* `referenceDate`: Used to calculate player age (with 2 decimal precision)

---

### `Player`

Represents a person who can be assigned to a team. This includes both registered members and new/prospective players.

**Attributes:**

* `id`: Internal ID
* `federationNumber` (optional): Unique identifier from the sports federation
* `firstName`, `middleName`, `lastName`
* `gender`
* `dateOfBirth`
* `profilePhoto` (optional)

**Computed:**

* `ageAtReferenceDate`: Age based on `Season.referenceDate`, formatted to 2 decimal places

**Note:** Players without a `federationNumber` can still be added to scenarios.

---

### `StaffMember`

Represents a coach, trainer, or support role participant.

**Attributes:**

* `id`
* `firstName`, `lastName`

---

### `Role`

Defines a staff role assignable within a team.

**Attributes:**

* `id`
* `name`: e.g., "Coach", "Trainer"
* `description`: Optional explanation

---

### `FederationCheck`

Represents the results of a federation validation process. It is based on an external CSV control file.

**Attributes:**

* `federationNumber`: Link to `Player`
* `status`: e.g., "Approved", "Blocked"
* `reason`
* `checkedAt`

**Note:**

* The CSV file is uploaded and parsed per season or scenario.
* Column headers are fixed, but column order may vary.
* Federation data affects how players are displayed in scenarios (e.g., warning icons, color borders).

---

### `Scenario`

A planning snapshot containing one or more teams and assignments.

**Attributes:**

* `id`
* `name`
* `status`: "Draft", "Final", or "Archived"
* `seasonId`: Link to `Season`

---

### `ScenarioTeam`

An instance of a team within a scenario.

**Attributes:**

* `id`
* `scenarioId`
* `teamTemplateId`: Refers to structural team template

---

### `TeamTemplate`

Defines the rules and structure for a team type (e.g., "U13 Girls").

**Attributes:**

* `id`
* `name`
* `ageCategory`
* `gender`
* `maxPlayers`
* `requiredRoleIds[]`: List of expected roles per team

---

### `ScenarioTeamAssignment`

Links a player or staff member to a team in a scenario.

**Attributes:**

* `id`
* `scenarioTeamId`
* `personType`: "player" or "staff"
* `federationNumber` (if player) or `staffMemberId`
* `roleId` (for staff only)
* `validationStatus`: e.g., "OK", "Too Young", "Duplicate", "Missing Data"

---

### `Note`

A flexible comment entity linked to players, teams, or entire scenarios.

**Attributes:**

* `id`
* `scenarioId`
* `targetType`: "player", "team", or "scenario"
* `targetId`
* `content`
* `createdBy`
* `createdAt`

---

### CSV Federation Check Integration (Process Overview)

* Each season allows import of one or more **federation control CSVs**.
* The application must support **dynamic column ordering** with **fixed headers**.
* Once uploaded, rows are matched to `Player.federationNumber`.
* Federation data can impact validation and **visual display** of player cards (e.g., warnings, highlights).
* A failed or missing federation match can trigger soft warnings (non-blocking).

## 🔺 UI Component Breakdown: Team Assignment Builder

This document provides a detailed overview of the main UI components within the **Team Assignment Builder** web application. It is intended to guide development, testing, and future extension of the UI, and can be referenced in the `architecture.md`.

---

### `App`

**Purpose:** Root component responsible for routing, context providers, and global state management.

**Key Responsibilities:**

* Loads initial data and context
* Wraps layout and functional pages

---

### `Sidebar`

**Purpose:** Displays the full list of available players (and potentially staff) for assignment.

**Features:**

* Search and filter players
* Render as draggable `PlayerCard`
* Support visual cues (warnings, notes)

---

### `ScenarioWorkspace`

**Purpose:** Visual workspace showing all current teams for the selected scenario.

**Features:**

* Contains a horizontal row of `TeamColumn`s
* Allows drop interaction for players/staff
* Highlights drop targets

---

### `TeamColumn`

**Purpose:** Represents one team in a scenario with assigned players and staff.

**Features:**

* Accepts drag-and-drop for `PlayerCard` and `StaffCard`
* Shows assigned members
* Enforces capacity and role validations

---

### `PlayerCard`

**Purpose:** Compact card displaying core player info with validation indicators.

**Contents:**

* Name, gender, age (computed)
* Visuals: border color for age category, warning/note icons
* Draggable in and out of teams

---

### `StaffCard`

**Purpose:** Similar to `PlayerCard`, but used for staff assignment.

**Features:**

* Includes a dropdown to assign a `Role`
* Shows assigned role badge once placed

---

### `UndoRedoControls`

**Purpose:** Controls to revert or reapply changes in the scenario editor.

**Features:**

* Buttons for undo and redo
* Keyboard shortcut integration (e.g., Ctrl+Z / Cmd+Z)

---

### `ScenarioStatusBar`

**Purpose:** Header bar displaying current scenario info and control actions.

**Features:**

* Shows scenario name, season, and current status
* Allows saving, duplicating, finalizing, or archiving

---

### `FederationCSVUploader`

**Purpose:** Allows CSV import and parsing of federation player control files.

**Features:**

* Maps dynamic column order based on fixed headers
* Triggers visual feedback (warning icons) on matched players
* Supports re-upload to refresh status

---

### `NoteTooltip`

**Purpose:** Tooltip that displays full content of a note icon.

**Triggered by:**

* Hover or tap on 🖊 icon next to player/team/scenario

---

### ✅ Usage





