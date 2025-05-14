## 🔧 Functional Description: Team Assignment Builder

This document outlines the full functional specification of the **Team Assignment Builder** application. It builds directly on the defined data model and is designed to support streamlined, transparent, and scalable team planning within sports associations.

---

### ✨ Key Objectives

* Centralize player and staff assignments per season.
* Replace error-prone spreadsheets and chat-based workflows.
* Provide intuitive drag-and-drop team creation.
* Validate against rules like age range, unique roles, and federation checks.
* Export scenarios and support multi-user collaboration.

---

### ⚖️ User Roles & Permissions

| Role                | Responsibilities                                    | Access Scope                     |
| ------------------- | --------------------------------------------------- | -------------------------------- |
| Technical Committee | Define long-term team structure, finalize scenarios | Full edit access                 |
| Team Coordinator    | Assign players/staff to teams within a season       | Edit access (season-specific)    |
| Coach/Staff         | View finalized team compositions                    | Read-only (final scenarios only) |
| Admin               | Manage users, seasons, role definitions             | Full system access               |

---

### 🌐 Core Functionalities

#### 1. Season Management

* Create, edit, and archive seasons.
* Define a **reference date** to compute exact player age with 2 decimals.

#### 2. Player & Staff Management

* Add players manually or import from federation CSV (supports mixed membership).
* Add staff members and roles.
* Optional federation number field enables link with external control list.

#### 3. Federation Control Import

* Upload CSV per season or scenario.
* Fixed column headers but flexible order.
* Matched by `federationNumber`.
* Trigger visual cues (e.g., border color, warning icon).

#### 4. Team Scenario Editor

* Create multiple scenario drafts per season.
* Drag-and-drop interface for assigning players/staff to teams.
* Undo/redo and multi-select supported.
* Auto-calculation of player age based on season.

#### 5. Team Templates

* Define default structure per team type (e.g., gender, max players, required roles).
* Validate against template when assigning players/staff.

#### 6. Validation & Warnings

* Validate in real-time without blocking user flow.
* Check for:

  * Duplicate assignments
  * Team size limits
  * Age category compliance
  * Federation check flags
  * Required staff roles per team

#### 7. Notes & Annotations

* Attach notes to players, teams, or entire scenarios.
* Flag issues, preferences, or special cases.

#### 8. Scenario Status & Versioning

* Status types: `Draft`, `Final`, `Archived`
* Lock edits on finalized versions.
* Duplicate scenarios for iteration.

#### 9. Export Functionality

* Export full scenario to Excel/CSV for federation submission or internal reporting.

---

### 🔧 Technical Characteristics

* Built with a component-based frontend (React).
* Drag-and-drop powered by `@dnd-kit/core`.
* Federation checks support CSV parsing with dynamic column mapping.
* Age calculations and validation are centralized logic for consistency.
* Undo/redo via history stack.

---

### ✅ Summary

The Team Assignment Builder enables sports clubs to move from manual planning to a modern, rules-aware, collaborative environment. It accounts for federated data, flexible team structures, and real-time feedback, while remaining intuitive and adaptable for volunteers and professionals alike.
