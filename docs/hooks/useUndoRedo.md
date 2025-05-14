# useUndoRedo Hook

A custom hook for implementing undo/redo functionality with type safety and history management.

## Features

- Undo/redo stack management
- Type-safe implementation
- History state tracking
- Optimized performance
- Clear history capability
- State validation

## Usage

```tsx
import { useUndoRedo } from '../hooks/useUndoRedo';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function TodoList() {
  const {
    state: todos,
    setState: setTodos,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  } = useUndoRedo<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), text, completed: false }
    ]);
  };

  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
      <button onClick={clearHistory}>Clear History</button>
      {/* Todo list implementation */}
    </div>
  );
}
```

## API

### Return Value

```typescript
{
  state: T[];                    // Current state
  setState: (newState: T[] | ((prev: T[]) => T[])) => void;
  undo: () => void;             // Undo last action
  redo: () => void;             // Redo last undone action
  canUndo: boolean;             // Whether undo is available
  canRedo: boolean;             // Whether redo is available
  clearHistory: () => void;     // Clear history while keeping current state
}
```

## Types

```typescript
interface HistoryState<T> {
  past: T[][];    // Previous states
  present: T[];   // Current state
  future: T[][];  // Redo stack
}
```

## Best Practices

1. Use appropriate state granularity
2. Consider memory usage
3. Implement proper validation
4. Handle edge cases
5. Provide user feedback
6. Consider performance impact
7. Test history management

## Performance Considerations

- Efficient state updates
- Memory management
- History stack limits
- State validation
- Optimized re-renders

## Implementation Details

### State Management
- Maintains three stacks: past, present, and future
- Present is the current state
- Past contains previous states
- Future contains states that can be redone

### Undo Operation
1. Move current state to future stack
2. Pop last state from past stack
3. Set as current state

### Redo Operation
1. Move current state to past stack
2. Pop first state from future stack
3. Set as current state

### State Updates
1. Add current state to past stack
2. Set new state as current
3. Clear future stack 