# Confirmation Dialog Component

A reusable modal dialog component for confirming user actions.

## Features

- Customizable title and message
- Confirm and cancel actions
- Accessible with ARIA attributes
- Backdrop overlay
- Keyboard navigation
- Focus management

## Usage

```tsx
import { useApp } from '../contexts/AppContext';

function MyComponent() {
  const { dispatch } = useApp();

  const showConfirmation = () => {
    dispatch({
      type: 'SET_CONFIRMATION_DIALOG',
      payload: {
        isOpen: true,
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?',
        onConfirm: () => {
          // Handle confirmation
          console.log('Confirmed');
        },
        onCancel: () => {
          // Handle cancellation
          console.log('Cancelled');
        }
      }
    });
  };

  return (
    <button onClick={showConfirmation}>Delete Item</button>
  );
}
```

## Props

The ConfirmationDialog component uses the following interface:

```typescript
interface ConfirmationDialog {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
```

## Styling

The component uses CSS modules with the following classes:

- `.confirmation-dialog-overlay`: Backdrop overlay
- `.confirmation-dialog`: Dialog container
- `.confirmation-dialog-title`: Dialog title
- `.confirmation-dialog-message`: Dialog message
- `.confirmation-dialog-actions`: Action buttons container
- `.confirmation-dialog-button`: Button styles
- `.confirmation-dialog-button.confirm`: Confirm button
- `.confirmation-dialog-button.cancel`: Cancel button

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Implements focus trap
- Keyboard navigation support
- Clear button labels
- Proper heading hierarchy

## Best Practices

1. Use clear and specific titles
2. Provide detailed but concise messages
3. Use appropriate button labels
4. Handle both confirmation and cancellation
5. Ensure proper focus management
6. Test keyboard navigation
7. Verify screen reader compatibility 