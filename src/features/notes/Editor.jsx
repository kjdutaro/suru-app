  import { useState, useEffect } from "react";
  import useUndoRedo from "../../hooks/useUndoRedo";

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
      canRedo
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


    // Auto-save (only runs if note exists)
    useEffect(() => {
      if (!note) return;

      const timeout = setTimeout(() => {
        updateNote(note.id, title, content);
        setDateUpdated(new Date().toISOString());
      }, 5000);

      return () => clearTimeout(timeout);
    }, [note, title, content]);

    const handleSave = () => {
      if (!note) return;
      updateNote(note.id, title, content);
      setDateUpdated(new Date().toISOString());
    };

    const handleDelete = () => {
      if (!note) return;
      deleteNote(note.id);
    }

    // 🔑 Notice: hooks above ALWAYS run, return is just conditional render
    if (!note) {
      return <div className="p-4">Select or create a note</div>;
    }

    return (
      <>
        <header className="flex items-center justify-between border-b-2 border-gray-300 px-2">
          <input
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center justify-end">
            <button
              className={`p-2 rounded ${canUndo ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"}`}
              title="Undo"
              onClick={undo}
              disabled={!canUndo}
            >
              <img src="undo.svg" alt="Undo Icon" />
            </button>
            <button
              className={`p-2 rounded ${canRedo ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"}`} title="Redo"
              onClick={redo}
              disabled={!canRedo}
            >
              <img src="redo.svg" alt="Redo Icon" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Save"
              onClick={handleSave}
            >
              <img src="save.svg" alt="Save Icon" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded" title="Sync">
              <img src="sync.svg" alt="Sync Icon" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Delete Note"
              onClick={handleDelete}
            >
              <img src="delete.svg" alt="Delete Icon" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded" title="Options">
              <img src="options.svg" alt="Menu Icon" />
            </button>
          </div>
        </header>
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
