# useDataTable Hook

A custom hook for managing data table state, including pagination, sorting, and filtering.

## Features

- Pagination management
- Sorting functionality
- Filtering capabilities
- Memoized calculations
- Type-safe implementation
- Flexible data handling

## Usage

```tsx
import { useDataTable } from '../hooks/useDataTable';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function UserTable() {
  const {
    items,
    pagination,
    sort,
    filters,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleFilter,
    handleFilterRemove,
    handleFiltersClear
  } = useDataTable<User>({
    initialItems: users,
    initialPageSize: 10,
    getValue: (user, field) => user[field as keyof User]
  });

  return (
    <div>
      {/* Table implementation */}
    </div>
  );
}
```

## API

### Options

```typescript
interface UseDataTableOptions<T> {
  initialItems: T[];
  initialPageSize?: number;
  getValue: (item: T, field: string) => any;
}
```

### Return Value

```typescript
{
  items: T[];                    // Current page items
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  sort: {
    field: string;
    direction: 'asc' | 'desc';
  };
  filters: FilterState[];
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  handleSort: (field: string) => void;
  handleFilter: (filter: FilterState) => void;
  handleFilterRemove: (field: string) => void;
  handleFiltersClear: () => void;
}
```

## Types

```typescript
interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

interface FilterState {
  field: string;
  value: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith';
}
```

## Best Practices

1. Use appropriate page sizes
2. Implement efficient filtering
3. Consider performance with large datasets
4. Handle edge cases (empty data, single page)
5. Provide clear user feedback
6. Maintain consistent sorting behavior
7. Use meaningful filter operators

## Performance Considerations

- Memoized calculations prevent unnecessary re-renders
- Efficient filtering and sorting algorithms
- Pagination reduces DOM elements
- Type safety prevents runtime errors
- Flexible enough for various data structures 