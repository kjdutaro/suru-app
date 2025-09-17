import { useState, useEffect } from "react";

export default function Editor({ note, updateNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const [dateCreated, setDateCreated] = useState("")
  const [dateUpdated, setDateUpdated] = useState("")

  useEffect(() => {
    if (note) {
      setTitle(note.title),
      setContent(note.content),
      setDateCreated(note.createdAt),
      setDateUpdated(note.updatedAt)
    }
  }, [note])

  if (!note) {
    return <div className="p-4">Select or create a note</div>;
  }

  const handleSave = () => {
    updateNote(note.id, title, content);
    setDateUpdated(new Date().toISOString()); // immediately reflect update
  };

  useEffect(() => {
    if (!note) return;

    const timeout = setTimeout(() => {
      updateNote(note.id, title, content);
      setDateUpdated(new Date().toISOString());
    }, 5000);

    return () => clearTimeout(timeout);
  }, [title, content, note.id]);

  return (
    <>
      <header className="flex items-center justify-between border-b-2 border-gray-300 px-2">
        <input type="text" placeholder="Untitled" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="flex items-center justify-end">
          <button className="p-2 hover:bg-gray-200 rounded" title="Undo" >
            <img src="undo.svg" alt="Undo Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Redo">
            <img src="redo.svg" alt="Redo Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Save" onClick={handleSave}>
            <img src="save.svg" alt="Save Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Sync">
            <img src="sync.svg" alt="Sync Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Delete Note">
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
      <textarea className="w-full p-2" placeholder="Start writing your note..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
    </>
  );
}