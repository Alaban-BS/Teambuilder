# Teambuilder

A React TypeScript application for managing teams, players, staff, seasons, and scenarios.

## Features

- User authentication with role-based access control
- Team management (create, read, update, delete)
- Player management
- Staff management
- Season management
- Scenario management with team assignments
- Responsive design
- Toast notifications
- Confirmation dialogs
- Loading states
- Local storage persistence
- Automated deployment with GitHub Actions

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Alaban-BS/Teambuilder.git
cd teambuilder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch. Visit the deployed site at: https://alaban-bs.github.io/Teambuilder

## Project Structure

```
src/
  ├── components/
  │   ├── auth/
  │   │   ├── LoginPage.tsx
  │   │   ├── ProtectedRoute.tsx
  │   │   └── UnauthorizedPage.tsx
  │   ├── common/
  │   │   ├── Toast.tsx
  │   │   ├── ConfirmationDialog.tsx
  │   │   └── LoadingSpinner.tsx
  │   └── TCDashboard.tsx
  ├── contexts/
  │   ├── AuthContext.tsx
  │   └── AppContext.tsx
  ├── hooks/
  │   ├── useLocalStorage.ts
  │   ├── useDataTable.ts
  │   └── useUndoRedo.ts
  ├── styles/
  │   ├── global.css
  │   ├── LoginPage.css
  │   ├── Toast.css
  │   ├── ConfirmationDialog.css
  │   └── LoadingSpinner.css
  ├── types.ts
  ├── utils/
  │   └── helpers.ts
  └── App.tsx
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## User Roles

- Admin: Full access to all features
- TC (Team Coordinator): Can manage teams, players, staff, and scenarios
- Coordinator: Can view teams and scenarios

## Development

### Adding New Features

1. Create new components in the `src/components` directory
2. Add new types in `src/types.ts`
3. Create new styles in the `src/styles` directory
4. Update the README.md with new features

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Use CSS modules or styled-components for styling

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
