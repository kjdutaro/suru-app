import { useState, useCallback } from "react";

export default function useUndoRedo(initialState = "") {
  const [history, setHistory] = useState([initialState]);
  const [pointer, setPointer] = useState(0);
  const current = history[pointer];
  const canUndo = pointer > 0;
  const canRedo = pointer < history.length - 1;

  const set = useCallback(
    (newValue) => {
      const newHistory = history.slice(0, pointer + 1);
      newHistory.push(newValue);
      setHistory(newHistory);
      setPointer(newHistory.length - 1);
    },
    [history, pointer]
  );

  const undo = useCallback(() => {
    if (canUndo) {
      setPointer((prev) => prev - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setPointer((prev) => prev + 1);
    }}, [canRedo]);

    const reset = useCallback((newState = "") => {
        setHistory([newState]);
        setPointer(0)
    },[]);

  return {
    value: current,
    set,
    undo,
    redo,
    reset,
    canUndo,
    canRedo
  };
}
