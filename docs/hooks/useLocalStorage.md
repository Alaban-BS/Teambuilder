# useLocalStorage Hook

A custom hook for persisting state in localStorage with type safety and cross-tab synchronization.

## Features

- Type-safe localStorage access
- Cross-tab synchronization
- Error handling
- SSR compatibility
- Automatic JSON parsing/stringifying
- Fallback to initial value

## Usage

```tsx
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UserSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  notifications: boolean;
}

function SettingsComponent() {
  const [settings, setSettings] = useLocalStorage<UserSettings>('userSettings', {
    theme: 'light',
    fontSize: 16,
    notifications: true
  });

  const updateTheme = (theme: 'light' | 'dark') => {
    setSettings(prev => ({
      ...prev,
      theme
    }));
  };

  return (
    <div>
      <button onClick={() => updateTheme('dark')}>Dark Theme</button>
      <button onClick={() => updateTheme('light')}>Light Theme</button>
    </div>
  );
}
```

## API

### Parameters

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void]
```

### Return Value

Returns a tuple containing:
1. The current value
2. A function to update the value

## Error Handling

The hook handles several error cases:
- localStorage not available
- JSON parsing errors
- Storage quota exceeded
- Cross-tab synchronization issues

## Best Practices

1. Use meaningful keys
2. Handle storage errors gracefully
3. Consider storage limits
4. Use appropriate data structures
5. Implement proper type definitions
6. Consider privacy implications
7. Test cross-tab behavior

## Performance Considerations

- Efficient JSON parsing
- Minimal re-renders
- Proper cleanup
- Memory management
- Cross-tab event handling

## Security Considerations

1. Don't store sensitive data
2. Validate stored data
3. Handle storage errors
4. Consider data encryption
5. Implement proper cleanup
6. Handle storage limits
7. Consider privacy regulations 