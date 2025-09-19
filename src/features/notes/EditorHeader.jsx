export default function EditorHeader({
  title,
  setTitle,
  canUndo,
  undo,
  canRedo,
  redo,
  handleSave,
  handleDelete
}) {
  return (
    <header className="flex items-center justify-between border-b-2 border-gray-300 px-2">
      <input
        type="text"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="font-semibold flex-1"
      />
      <div className="flex items-center justify-end">
        <button
          className={`p-2 rounded ${
            canUndo ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
          }`}
          title="Undo"
          onClick={undo}
          disabled={!canUndo}
        >
          <img src="undo.svg" alt="Undo Icon" />
        </button>
        <button
          className={`p-2 rounded ${
            canRedo ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
          }`}
          title="Redo"
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
  );
}
