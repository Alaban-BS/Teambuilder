import { useState, useMemo } from 'react';
import { PaginationState, SortState, FilterState } from '../types/common';
import { filterItems, sortItems, paginateItems } from '../utils/helpers';

interface UseDataTableOptions<T> {
  initialItems: T[];
  initialPageSize?: number;
  getValue: (item: T, field: string) => any;
}

export function useDataTable<T>({
  initialItems,
  initialPageSize = 10,
  getValue,
}: UseDataTableOptions<T>) {
  const [items] = useState<T[]>(initialItems);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: initialPageSize,
    totalItems: initialItems.length,
  });
  const [sort, setSort] = useState<SortState>({
    field: '',
    direction: 'asc',
  });
  const [filters, setFilters] = useState<FilterState[]>([]);

  const filteredItems = useMemo(() => {
    let result = [...items];
    if (filters.length > 0) {
      result = filterItems(result, filters, getValue);
    }
    if (sort.field) {
      result = sortItems(result, sort, getValue);
    }
    return result;
  }, [items, filters, sort, getValue]);

  const paginatedItems = useMemo(() => {
    return paginateItems(
      filteredItems,
      pagination.currentPage,
      pagination.itemsPerPage
    );
  }, [filteredItems, pagination.currentPage, pagination.itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / pagination.itemsPerPage);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.min(Math.max(1, page), totalPages),
    }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: pageSize,
      currentPage: 1,
    }));
  };

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilter = (filter: FilterState) => {
    setFilters((prev) => {
      const existingFilterIndex = prev.findIndex((f) => f.field === filter.field);
      if (existingFilterIndex >= 0) {
        const newFilters = [...prev];
        newFilters[existingFilterIndex] = filter;
        return newFilters;
      }
      return [...prev, filter];
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterRemove = (field: string) => {
    setFilters((prev) => prev.filter((f) => f.field !== field));
  };

  const handleFiltersClear = () => {
    setFilters([]);
  };

  return {
    items: paginatedItems,
    pagination: {
      ...pagination,
      totalPages,
    },
    sort,
    filters,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleFilter,
    handleFilterRemove,
    handleFiltersClear,
  };
} 