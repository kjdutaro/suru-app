import { useState, useEffect } from "react";
import useUndoRedo from "../../hooks/useUndoRedo";
import EditorHeader from "./EditorHeader";

export default function Editor({ note, updateNote, deleteNote, addNote, setActiveNoteId, openSidebar }) {
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
    } else {
      // no note at all → reset to blank
      setTitle("");
      setDateCreated(new Date().toISOString());
      setDateUpdated(new Date().toISOString());
      reset("");
    }
  }, [note, reset]); // <- remove note?.id, depend on whole note


  // Auto-save (debounce) when title or content changes
  useEffect(() => {
    if (!note) return;

    if (note.isDraft) {
      if (title.trim() || content.trim()) {
        // Convert draft to a real note
        const created = addNote(title, content);
        setActiveNoteId(created.id);
      }
      return;
    }

    if (title === note.title && content === note.content) return;
    const timeout = setTimeout(() => {
      updateNote(note.id, title, content);
      setDateUpdated(new Date().toISOString());
    }, 1500);
    return () => clearTimeout(timeout);
  }, [note, title, content, updateNote, addNote, setActiveNoteId]);


  useEffect(() => {
    if (!note || !note.id) return; // only run if note exists

    const interval = setInterval(() => {
      updateNote(note.id, title, content);
      setDateUpdated(new Date().toISOString());
    }, 30000);

    return () => clearInterval(interval);
  }, [note, title, content, updateNote]);
  const handleSave = () => {
    if (!note) return;
    if (note.isDraft) {
      if (title.trim() === "" && content.trim() === "") {
        return; // don’t save blank draft
      }
      const created = addNote(title, content);
      setActiveNoteId(created.id);
      return;
    }
  };

  const handleDelete = () => {
    if (!note) return;

    if (note.isDraft) {
      // Reset draft editor instead of deleting
      setTitle("");
      setContent("");
      setDateCreated(new Date().toISOString());
      setDateUpdated(new Date().toISOString());
      return;
    }

    deleteNote(note.id);
  };

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
        openSidebar={openSidebar}
        isDraft={!!note?.isDraft}
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
