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

    const activeNote = notes.find(note => note.id === activeNoteId);

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
                    note={activeNote}
                    updateNote={updateNote}
                    deleteNote={(id) => {
                        deleteNote(id);
                        setActiveNoteId(null);
                    }}
                    openSidebar={() => setIsSidebarOpen(true)}
                />
            </main>
        </div>
    );
}

export default MainLayout;