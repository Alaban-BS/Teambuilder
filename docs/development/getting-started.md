# Getting Started

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Modern web browser
- Code editor (VS Code recommended)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd team-assignment-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment file:
```bash
cp .env.example .env
```

## Development

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser:
```
http://localhost:3000
```

## Project Structure

```
/src
  /components     – React components
  /styles        – CSS modules
  /tests         – Unit and integration tests
  /data          – JSON data files
  /hooks         – Custom React hooks
  /logic         – Business logic
```

## Key Features

### Drag and Drop
- Uses dnd-kit for drag and drop functionality
- Supports player and staff assignment
- Implements validation during drag

### Data Management
- JSON-based data storage
- Local storage persistence
- CSV import/export

### Validation
- Age-based validation
- Team capacity checks
- Federation compliance

## Development Workflow

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Run tests:
```bash
npm test
# or
yarn test
```

4. Commit your changes:
```bash
git commit -m "feat: your feature description"
```

5. Push your branch:
```bash
git push origin feature/your-feature-name
```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- path/to/test.tsx
```

### Test Structure
- Unit tests: `*.test.ts`
- Component tests: `*.test.tsx`
- Integration tests: `*.integration.test.tsx`

## Building for Production

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Preview the build:
```bash
npm run preview
# or
yarn preview
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `vite.config.js`
   - Kill the process using the port

2. **TypeScript errors**
   - Run `npm run type-check`
   - Check for missing types
   - Update TypeScript definitions

3. **Test failures**
   - Check test data
   - Verify component changes
   - Update test snapshots

## Additional Resources

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [dnd-kit Documentation](https://dndkit.com/)
- [Vite Documentation](https://vitejs.dev/) 