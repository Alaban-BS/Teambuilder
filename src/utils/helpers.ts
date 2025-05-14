import { Toast, FilterState, SortState } from '../types/common';

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createToast(
  message: string,
  type: Toast['type'] = 'info',
  duration: number = 3000
): Toast {
  return {
    id: generateId(),
    type,
    message,
    duration,
  };
}

export function filterItems<T>(
  items: T[],
  filters: FilterState[],
  getValue: (item: T, field: string) => any
): T[] {
  return items.filter((item) =>
    filters.every((filter) => {
      const value = getValue(item, filter.field);
      switch (filter.operator) {
        case 'equals':
          return value === filter.value;
        case 'contains':
          return String(value).toLowerCase().includes(filter.value.toLowerCase());
        case 'startsWith':
          return String(value).toLowerCase().startsWith(filter.value.toLowerCase());
        case 'endsWith':
          return String(value).toLowerCase().endsWith(filter.value.toLowerCase());
        default:
          return true;
      }
    })
  );
}

export function sortItems<T>(
  items: T[],
  sort: SortState,
  getValue: (item: T, field: string) => any
): T[] {
  return [...items].sort((a, b) => {
    const valueA = getValue(a, sort.field);
    const valueB = getValue(b, sort.field);

    if (valueA < valueB) return sort.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export function paginateItems<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
} 