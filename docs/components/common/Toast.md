# Toast Component

A reusable notification component that displays temporary messages to users.

## Features

- Multiple types: success, error, info, warning
- Auto-dismissal after configurable duration
- Manual dismissal option
- Accessible with ARIA attributes
- Animated entrance and exit
- Stacked notifications

## Usage

```tsx
import { ToastContainer } from '../components/common/Toast';
import { useApp } from '../contexts/AppContext';

function MyComponent() {
  const { dispatch } = useApp();

  const showToast = () => {
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        id: generateId(),
        type: 'success',
        message: 'Operation completed successfully',
        duration: 3000
      }
    });
  };

  return (
    <>
      <button onClick={showToast}>Show Toast</button>
      <ToastContainer />
    </>
  );
}
```

## Props

The Toast component accepts the following props:

```typescript
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number; // in milliseconds, defaults to 3000
}
```

## Styling

The component uses CSS modules with the following classes:

- `.toast-container`: Container for all toasts
- `.toast`: Individual toast element
- `.toast-content`: Content wrapper
- `.toast-message`: Message text
- `.toast-close`: Close button
- `.toast-{type}`: Type-specific styles (success, error, info, warning)

## Accessibility

- Uses `role="alert"` for screen readers
- Includes close button with `aria-label`
- Keyboard accessible
- Color contrast meets WCAG standards

## Best Practices

1. Keep messages concise and clear
2. Use appropriate toast types for different scenarios
3. Don't show too many toasts simultaneously
4. Use longer durations for important messages
5. Include actionable information when relevant 