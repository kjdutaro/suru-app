import Sidebar from './../features/notes/Sidebar';
import Editor from './../features/notes/Editor';
import useNote from '../hooks/useNote';
import { useState, useEffect } from 'react';

function MainLayout() {
    const { notes, addNote, updateNote, deleteNote } = useNote();
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (notes.length > 0 && !activeNoteId) {
            setActiveNoteId(notes[notes.length - 1].id);
        }
    }, [notes, activeNoteId]);

    // If no notes exist, create a temporary "draft" object
    // Draft template (no id, so it's not persisted)
    const draftNote = {
        title: "",
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDraft: true,
    };

    // Always create a fresh draftNote when there are no notes
    const activeNote =
        notes.length === 0
            ? { ...draftNote } // ensure new object each time
            : notes.find((note) => note.id === activeNoteId) || null;



    return (
        <div className="flex h-full w-full">
            {/* Desktop Sidebar */}
            <aside className="hidden sm:block h-full bg-gray-50 m-0 p-0 w-64">
                <Sidebar
                    notes={notes}
                    addNote={addNote}
                    setActiveNoteId={setActiveNoteId}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
            </aside>

            {/* Mobile Sidebar (always mounted, just toggled) */}
            <div className="fixed inset-0 z-50 pointer-events-none sm:hidden">
                {/* Overlay */}
                <div
                    className={`
                        absolute inset-0 bg-black transition-opacity duration-300
                        ${isSidebarOpen ? "opacity-50 pointer-events-auto" : "opacity-0"}
                        `}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar with slide-in animation */}
                <div
                    className={`
                        absolute left-0 top-0 h-full w-64 bg-gray-50 shadow-lg
                        transform transition-transform duration-300
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        `}
                >
                    <Sidebar
                        notes={notes}
                        addNote={addNote}
                        setActiveNoteId={setActiveNoteId}
                        closeSidebar={() => setIsSidebarOpen(false)}
                    />
                </div>
            </div>

            <main className="flex-1 p-2 bg-white h-full">
                <Editor
                    key={activeNote?.id || (activeNote?.isDraft ? `draft-${activeNote.createdAt}` : "empty")}
                    note={activeNote}
                    updateNote={updateNote}
                    deleteNote={(id) => {
                        deleteNote(id);
                        const remaining = notes.filter((n) => n.id !== id);
                        if (remaining.length === 0) {
                            setActiveNoteId(null); // forces fresh draftNote
                        } else {
                            setActiveNoteId(remaining[0].id);
                        }
                    }}
                    addNote={addNote}
                    setActiveNoteId={setActiveNoteId}
                    openSidebar={() => setIsSidebarOpen(true)}
                />
            </main>
        </div>
    );
}

export default MainLayout;