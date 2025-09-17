export default function Editor() {
  return (
    <>
      <header >
        <div className="flex items-center justify-end mb-4">
          <div className="flex gap-2">
            <img src="logo.svg" alt="Suru logo" />
          </div>
          <button title="Close sidebar">
            <img src="hide.svg" alt="Hide Icon" />
          </button>
        </div>
      </header>
      <input type="text" placeholder="Untitled"/>
      <textarea className="w-full" placeholder="Start writing your note..."></textarea>
    </>
  );
}