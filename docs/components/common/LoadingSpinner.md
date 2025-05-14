# Loading Spinner Component

A global loading indicator component that displays during asynchronous operations.

## Features

- Global loading state management
- Optional loading message
- Centered overlay design
- Accessible with ARIA attributes
- Smooth animations
- Responsive layout

## Usage

```tsx
import { useApp } from '../contexts/AppContext';

function MyComponent() {
  const { dispatch } = useApp();

  const startLoading = () => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: true,
        message: 'Loading data...'
      }
    });
  };

  const stopLoading = () => {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: false
      }
    });
  };

  return (
    <>
      <button onClick={startLoading}>Start Loading</button>
      <button onClick={stopLoading}>Stop Loading</button>
    </>
  );
}
```

## Props

The LoadingSpinner component uses the following interface:

```typescript
interface LoadingState {
  isLoading: boolean;
  message?: string;
}
```

## Styling

The component uses CSS modules with the following classes:

- `.loading-spinner-overlay`: Full-screen overlay
- `.loading-spinner-container`: Centered container
- `.loading-spinner`: Animated spinner
- `.loading-message`: Optional message text

## Accessibility

- Uses `role="alert"` and `aria-busy="true"`
- Provides loading status to screen readers
- Maintains focus management
- Clear visual indication of loading state

## Best Practices

1. Use appropriate loading messages
2. Keep loading states brief when possible
3. Show loading state for all async operations
4. Handle loading errors gracefully
5. Consider using skeleton loaders for longer operations
6. Test with screen readers
7. Ensure proper contrast ratios 