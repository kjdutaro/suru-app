import { useState, useEffect, use } from "react";
import useUndoRedo from "../../hooks/useUndoRedo";
import EditorHeader from "./EditorHeader";

export default function Editor({ note, updateNote, deleteNote }) {
  const [title, setTitle] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dateUpdated, setDateUpdated] = useState("");

  const {
    value: content,
    set: setContent,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useUndoRedo(note ? note.content : "");

  // When note changes, update editor fields
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDateCreated(note.createdAt);
      setDateUpdated(note.updatedAt);
      reset(note.content);
    }
  }, [note?.id, reset]);

  // Auto-save (debounce) when title or content changes
  useEffect(() => {
    if (!note) return;
    if (title === note.title && content === note.content) return;

    const timeout = setTimeout(() => {
      updateNote(note.id, title, content);
      setDateUpdated(new Date().toISOString());
    }, 1500);
    return () => clearTimeout(timeout);
  }, [note, title, content, updateNote]);

  useEffect(() => {
    if (!note) return;

    const interval = setInterval(() => {
      updateNote(note.id, title, content);
      setDateUpdated(new Date().toISOString());
    }, 30000);

    return () => clearInterval(interval);
  }, [note, title, content, updateNote]);

  const handleSave = () => {
    if (!note) return;
    updateNote(note.id, title, content);
    setDateUpdated(new Date().toISOString());
  };

  const handleDelete = () => {
    if (!note) return;
    deleteNote(note.id);
  };

  if (!note) {
    return <div className="p-4">Select or create a note</div>;
  }

  return (
    <>
      <EditorHeader
        title={title}
        setTitle={setTitle}
        canUndo={canUndo}
        undo={undo}
        canRedo={canRedo}
        redo={redo}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />

      <div className="flex gap-4">
        <small>Created: {new Date(dateCreated).toLocaleString()}</small>
        <small>Updated: {new Date(dateUpdated).toLocaleString()}</small>
      </div>

      <textarea
        className="w-full p-2"
        placeholder="Start writing your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </>
  );
}
