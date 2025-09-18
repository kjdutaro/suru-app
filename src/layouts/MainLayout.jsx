import Sidebar from './../features/notes/Sidebar';
import Editor from './../features/notes/Editor';
import useNote from '../hooks/useNote';
import { useState } from 'react';

function MainLayout() {
    const { notes, addNote, updateNote, deleteNote } = useNote();
    const [activeNoteId, setActiveNoteId] = useState(null);
    const activeNote = notes.find(note => note.id === activeNoteId);


    return (
        <div className="flex h-full w-full">
            <aside className="h-full bg-gray-50 m-0 p-0">
                <Sidebar
                    notes={notes}
                    addNote={addNote}
                    setActiveNoteId={setActiveNoteId} />
            </aside>
            <main className='p-2 bg-white w-full h-full'>
                <Editor 
                    note={activeNote} 
                    updateNote={updateNote}
                    deleteNote={(id) => {
                        deleteNote(id);
                        setActiveNoteId(null);
                    }}
                />
            </main>
        </div>
    )
}

export default MainLayout;