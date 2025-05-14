# System Overview

## High-Level Architecture
The Team Assignment Builder is a frontend-only web application (MVP phase) built with React + TypeScript, optimized for modern browsers and tablets.

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

## Core Components
1. **Data Layer**
   - JSON-based flat data model
   - Local storage for persistence
   - Federation CSV integration

2. **UI Layer**
   - Drag-and-drop interface
   - Real-time validation
   - Scenario management
   - Staff/Player assignment

3. **Business Logic**
   - Age calculations
   - Team validation rules
   - Federation checks
   - Scenario management

## Technical Stack
- React + TypeScript
- dnd-kit (drag and drop)
- Vite (build tool)
- Testing Library
- Cursor AI (development assistance)

## Future Considerations
- Backend integration
- Real-time collaboration
- Advanced federation integration
- Mobile optimization 