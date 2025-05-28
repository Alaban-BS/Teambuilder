# 🛠️ Development Guidelines – Team Assignment Builder

## 1. 🎯 Purpose & Scope

### Purpose
The Team Assignment Builder modernizes the annual team assignment process for a sports club through a web application. It reduces planning errors, accelerates workflows, and enforces basic validation rules through a central interface.

### In Scope
- Management of seasons, players, staff, and teams
- Create, duplicate, archive, and finalize team assignment scenarios
- Season-specific scenario management
- Visual, non-blocking validations (age, gender, team size, duplicate assignments)
- Role-based access control
- Configuration panel for managing core entities

### Out of Scope
- Match or training planning
- Financial administration
- Push notifications or emails
- Native mobile app (responsive web support only)
- Audit logging (not required in MVP)

---

## 2. 🧱 Architecture & Technology

### Tech Stack
- **Frontend:** React, TypeScript, CSS Modules
- **State Management:** React Context API
- **Development Tools:** ESLint, Prettier
- **Testing:** `@testing-library/react`

### Component Structure
- `App`: Root component managing global state and navigation
- `ConfigLayout`: Configuration panel for managing teams, players, and seasons
- `DashboardLayout`: Main dashboard showing scenarios for selected season
- `PlayerAssignmentDialog`: Dialog for confirming player moves
- `ScenarioForm`: Form for creating and editing scenarios
- `TeamCard`: Displays team information and assignments

### State Management
- Context API for global state
- Local state for component-specific data
- Props for component communication

### Data Flow
- Top-down data flow through props
- Context for shared state
- Callback functions for state updates

---

## 3. 💡 UX & UI Guidelines

- **Layout:** 
  - Navigation bar for switching between dashboard and configuration
  - Dashboard with season selector and scenario management
  - Configuration panel with tabbed interface
- **Responsiveness:** Support for modern browsers and tablets
- **Component Styling:**
  - CSS Modules for component-specific styles
  - Consistent color scheme and spacing
  - Clear visual hierarchy
- **Form Design:**
  - Clear labels and placeholders
  - Validation feedback
  - Consistent button styling
- **Accessibility:** Basic accessibility support

---

## 4. 🔐 Authentication & Access Control

- **Roles:**
  - Admin: Full system access
  - Technical Committee: Full edit access
  - Team Coordinator: Season-specific edit access
  - Coach/Staff: Read-only access to final scenarios
- **Permissions:**
  - Role-based access to features
  - Season-specific access control
  - Scenario-level permissions

---

## 5. 🔄 Version Control & CI/CD

- **Platform:** GitHub
- **Branch Strategy:** 
  - `main` branch for production
  - Feature branches for development
- **CI/CD:**
  - Automated builds on push
  - TypeScript compilation checks
  - ESLint validation

---

## 6. 🧪 Testing Strategy

- **Unit Tests:**
  - Component rendering
  - State management
  - Form validation
- **Integration Tests:**
  - User flows
  - Data management
  - Access control
- **Test Coverage:**
  - Critical user paths
  - Core functionality
  - Edge cases

---

## 7. 📦 Code Organization

- **Directory Structure:**
  ```
  src/
    ├── components/
    │   ├── common/
    │   ├── config/
    │   └── dashboard/
    ├── hooks/
    ├── contexts/
    ├── types/
    └── utils/
  ```
- **File Naming:**
  - PascalCase for components
  - camelCase for utilities
  - `.tsx` for React components
  - `.ts` for TypeScript files
  - `.module.css` for CSS modules

---

## 8. 📝 Code Style

- **TypeScript:**
  - Strict type checking
  - Interface-first design
  - Proper type exports
- **React:**
  - Functional components
  - Hooks for state and effects
  - Props interface definitions
- **CSS:**
  - CSS Modules for scoped styles
  - BEM-like naming convention
  - Responsive design patterns

---

## 9. 🔄 Maintaining Guidelines

- Keep documentation in sync with code changes
- Update guidelines when adding new features
- Review and update quarterly
- Document breaking changes
