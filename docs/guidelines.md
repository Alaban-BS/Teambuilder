# 🛠️ Development Guidelines – Team Assignment Builder

## 1. 🎯 Purpose & Scope

### Purpose
The Team Assignment Builder modernizes the annual team assignment process for a sports club through a visual, drag-and-drop web application. It reduces planning errors, accelerates workflows, and enforces basic validation rules through a central interface.

### In Scope
- Management of seasons, players, staff, and teams
- Create, duplicate, archive, and finalize team assignment scenarios
- Drag-and-drop linking of players and staff to teams
- Visual, non-blocking validations (age, gender, team size, duplicate assignments)
- Undo/redo functionality
- Export to CSV/Excel per scenario

### Out of Scope
- Match or training planning
- Financial administration
- Push notifications or emails
- Native mobile app (responsive web support only)
- Audit logging (not required in MVP)

---

## 2. 🧱 Architecture & Technology

### Tech Stack
- **Frontend:** React, TypeScript, dnd-kit, react-tooltip
- **AI Tools:** Cursor for component generation, refactoring, validation, and test creation
- **Testing:** `@testing-library/react` with unit and integration testing

### Component Structure
- `App`: Root component managing global state
- `Sidebar`: Lists players with search and filters
- `ScenarioWorkspace`: Holds teams as dropzones
- `TeamColumn`: Displays a specific team and assigned players
- `PlayerCard`: Compact component showing player info
- `UndoRedoControls`: Controls for undo and redo

### State Management
- Context API (centralized global state)
- Undo/Redo handled using `use-undo` or a custom stack

### Persistent History
- Actions must persist across page refresh (e.g., using localStorage or IndexedDB)

---

## 3. 💡 UX & UI Guidelines

- **Layout:** Two-column structure
  - Left: player list with filters
  - Right: scenario workspace with team columns
- **Responsiveness:** Minimum support for modern tablets
- **PlayerCard Content:**
  - Name, gender icon
  - Age on reference date
  - Profile picture or initials-based avatar
  - Border color by age group
  - Icons for warnings (⚠️) or notes (📝)
- **Validation Feedback:** Visual and non-blocking
- **Accessibility:** No formal WCAG requirements

---

## 4. 🔐 Authentication & Access Control

- **Login Method:**
  - Username = email address
  - 4-digit pincode (editable by admin)
  - Lockout after 3 failed attempts: 10-minute timeout
- **Roles & Permissions:**
  - Technical Committee (TC): full editing rights
  - Team Coordinators: edit assigned scenarios
  - Coaches/Staff: view-only access
  - Admin: manages users and login credentials

---

## 5. 🔄 Version Control & CI/CD

- **Platform:** GitHub
- **Branch Strategy:** Simple setup with `main` and feature branches
- **CI/CD:**
  - Push to `main` triggers automatic deploy
  - Lightweight setup suitable for a solo developer
  - No mandatory code review; AI-generated code is auto-approved
  - Cursor-generated changes must include updated and executed tests

---

## 6. 🧪 Testing Strategy

- **Tools:** `@testing-library/react`
- **Required:**
  - Unit tests per component
  - Integration tests for full scenario flow and validations
  - Drag-and-drop simulations
- **AI Code Support:**
  - Cursor AI allowed to perform full refactors
  - Tests must be auto-updated and executed

---

## 7. 📦 Hosting & Deployment

- **Hosting Platform:** To be determined (e.g., Vercel, Netlify)
- **Offline Support:** Not required
- **Deployment:** Fast, automatic deployment preferred for rapid iterations

---

## 8. 📁 Additional Notes

- No audit trail logging is required for the MVP
- Export functionality (CSV/Excel) must be available per scenario
- All code should be structured for future extensions and AI-assisted enhancements
---

## 9. 🔄 Maintaining Guidelines with AI

- All changes made to the application codebase **must be reflected immediately** in this Markdown file.
- Cursor AI should regularly monitor for inconsistencies between code and documentation.
- When new code introduces changes to functionality, architecture, or logic, this Markdown should be **updated automatically or manually** to reflect those changes.
- If any **conflicts or contradictions** between the code and this document arise, they must be flagged and resolved promptly.
