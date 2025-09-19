import { useState } from "react";

export default function Sidebar({ notes, addNote, setActiveNoteId, closeSidebar }) {
  const [isHidden, setIsHidden] = useState(false);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
    if (closeSidebar) closeSidebar(); // close floating sidebar in mobile
  };

  return (
    <div
      className={`h-full bg-gray-100  m-0 transition-all duration-300 ${isHidden ? "w-14 p-2 pt-4" : "w-64 p-4"
        }`}
      style={{ overflow: "hidden" }}
    >
      <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200">
        {isHidden ? (
          <div className="group flex justify-center p-2 rounded hover:bg-gray-200">
            <button
              title="Open sidebar"
              onClick={() => setIsHidden(false)}
              className="transition-opacity"
            >
              <img src="show.svg" alt="Show Icon" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <img src="logo.svg" alt="Suru logo" />
              <h1 className="font-bold text-2xl">Suru</h1>
            </div>
            <button
              className="p-2 hover:bg-gray-200 rounded"
              title="Close sidebar"
              onClick={toggleSidebar}
            >
              <img src="hide.svg" alt="Hide Icon" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <button
          onClick={() => {
            const created = addNote("", "");
            setActiveNoteId(created.id);
          }}
          title="New Note"
          className="flex gap-2 p-2 hover:bg-gray-200 rounded"
        >
          <img src="file-plus.svg" alt="File Icon" />{" "}
          {!isHidden && <span>New Note</span>}
        </button>
        <button title="Profile" className="flex gap-2 p-2 hover:bg-gray-200 rounded">
          <img src="profile.svg" alt="Profile Icon" />{" "}
          {!isHidden && <span>Profile</span>}
        </button>
        <button title="Settings" className="flex gap-2 p-2 hover:bg-gray-200 rounded">
          <img src="settings.svg" alt="Settings Icon" />{" "}
          {!isHidden && <span>Settings</span>}
        </button>
      </div>

      {!isHidden && (
        <>
          <h2 className="font-medium text-zinc-400">Notes</h2>
          <ul>
            {[...notes]
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((note) => (
                <li
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className="p-2 hover:bg-gray-200 rounded truncate"
                >
                  {note.title || note.content || "Untitled"}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
