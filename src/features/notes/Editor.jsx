export default function Editor() {
  return (
    <>
      <header className="flex items-center justify-between border-b-2 border-gray-300 px-2">
        <input type="text" placeholder="Untitled" />
        <div className="flex items-center justify-end">
          <button className="p-2 hover:bg-gray-200 rounded" title="Undo">
            <img src="undo.svg" alt="Hide Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Redo">
            <img src="redo.svg" alt="Hide Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Save">
            <img src="save.svg" alt="Hide Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Sync">
            <img src="sync.svg" alt="Hide Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Delete Note">
            <img src="delete.svg" alt="Hide Icon" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded" title="Options">
            <img src="options.svg" alt="Hide Icon" />
          </button>
        </div>
      </header>

      <textarea className="w-full p-2" placeholder="Start writing your note..."></textarea>
    </>
  );
}