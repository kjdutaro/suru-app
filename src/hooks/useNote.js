// hooks/useNote.jsx
import { useCallback, useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export default function useNote() {
  const [notes, setNotes] = useState(() => loadFromStorage("notes", []));


  useEffect(() => {
    saveToStorage("notes", notes);
    console.log("Notes saved to localStorage:", notes);
  }, [notes]);

  const addNote = useCallback((title = "", content = "") => {
    const now = new Date().toISOString();
    const newNote = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [...prev, newNote]);
    return newNote;
  }, []);

  const updateNote = useCallback((id, title, content) => {
    const now = new Date().toISOString();
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, title, content, updatedAt: now } : note
      )
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, [])

  return {
    notes,
    addNote,
    updateNote,
    deleteNote
  };
}
