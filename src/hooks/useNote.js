// hooks/useNote.jsx
import { useState } from "react";

export default function useNote() {
  const [notes, setNotes] = useState([]);

  const addNote = (title = "", content = "") => {
    const now = new Date().toISOString();
    const newNote = {
      id: crypto.randomUUID(), // or use uuidv4()
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };

    setNotes(prev => [...prev, newNote]);
    console.log("Note added:", newNote);
    return newNote;
  };

  const updateNote = (id, title, content) => {
    const now = new Date().toISOString();
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, title, content, updatedAt: now } : note
      )
    );
  };

  return {
    notes,
    addNote,
    updateNote,
  };
}
