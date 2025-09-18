import { useState, useCallback } from "react";

export default function useUndoRedo(initialState = "") {
  const [history, setHistory] = useState([initialState]);
  const [pointer, setPointer] = useState(0);
  const current = history[pointer];
  const canUndo = pointer > 0;

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
    if (pointer > 0) {
      setPointer(pointer - 1);
    }
  }, [pointer]);

  return {
    value: current,
    set,
    undo,
    canUndo
  };
}
