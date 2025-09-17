import { useState } from "react";

export default function Sidebar() {
  const [isHidden, setIsHidden] = useState(false);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className={`h-full bg-gray-100 p-4 transition-all duration-300 ${isHidden ? 'w-14' : 'w-64'}`}
      style={{ overflow: 'hidden' }}
    >
      <div className="flex items-center justify-between mb-4">
        {isHidden ? (
          <div className="relative group w-full flex justify-center">
            <a href="#" className="opacity-100 group-hover:opacity-0 transition-opacity"><img src="logo.svg" alt="Suru logo" /></a>
            <button
              title="Open sidebar"
              onClick={toggleSidebar}
              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <img src="show.svg" alt="Show Icon" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <img src="logo.svg" alt="Suru logo" />
              <h1 className="font-bold text-2xl">Suru</h1>
            </div>
            <button title="Close sidebar" onClick={toggleSidebar}><img src="hide.svg" alt="Hide Icon" /></button>
          </>
        )}
      </div>
      {!isHidden && (
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-200 rounded">Note 1</li>
          <li className="p-2 hover:bg-gray-200 rounded">Note 2</li>
          <li className="p-2 hover:bg-gray-200 rounded">Note 3</li>
        </ul>
      )}
    </div>
  );
}