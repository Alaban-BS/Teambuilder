import { useState, useCallback } from 'react';

interface HistoryState<T> {
  past: T[][];
  present: T[];
  future: T[][];
}

export function useUndoRedo<T>(initialState: T[]) {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future],
    });
  }, [history, canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture,
    });
  }, [history, canRedo]);

  const setState = useCallback((newState: T[]) => {
    setHistory((prevHistory) => ({
      past: [...prevHistory.past, prevHistory.present],
      present: newState,
      future: [],
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory({
      past: [],
      present: history.present,
      future: [],
    });
  }, [history.present]);

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  };
} 