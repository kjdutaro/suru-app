export default function EditorHeader({
    title,
    setTitle,
    canUndo,
    undo,
    canRedo,
    redo,
    handleSave,
    handleDelete,
    openSidebar,
    isDraft
}) {
    return (
        <header className="border-b-2 border-gray-300 px-2 py-1">
            {/* Row 1 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo/Menu button only on mobile */}
                    <button
                        className="sm:hidden p-2 hover:bg-gray-200 rounded"
                        onClick={openSidebar}
                        title="Menu"
                    >
                        <img src="logo.svg" alt="Menu Logo" className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex items-center">
                    <button
                        className={`p-2 rounded ${canUndo ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
                            }`}
                        title="Undo"
                        onClick={undo}
                        disabled={!canUndo}
                    >
                        <img src="undo.svg" alt="Undo Icon" />
                    </button>
                    <button
                        className={`p-2 rounded ${canRedo ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
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
                    {/* <button className="p-2 hover:bg-gray-200 rounded" title="Sync">
                        <img src="sync.svg" alt="Sync Icon" />
                    </button> */}
                    <button
                        className={`p-2 rounded ${!isDraft ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"}`}
                        title="Delete Note"
                        onClick={handleDelete}
                        disabled={isDraft}
                    >
                        <img src="delete.svg" alt="Delete Icon" />
                    </button>

                    {/* <button className="p-2 hover:bg-gray-200 rounded" title="Options">
                        <img src="options.svg" alt="Menu Icon" />
                    </button> */}
                </div>
            </div>

            {/* Row 2 */}
            <div className="mt-2">
                <input
                    type="text"
                    placeholder="Untitled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="font-semibold w-full"
                />
            </div>
        </header>
    );
}
