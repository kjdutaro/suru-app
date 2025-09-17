import Sidebar from './../features/notes/Sidebar';
import Editor from './../features/notes/Editor';


function MainLayout() {
    return (
        <div className="flex h-full w-full">
            <aside className="h-full bg-gray-50 m-0 p-0">
                <Sidebar />
            </aside>
            <main className='p-2 bg-white w-full h-full'>
                <Editor />
            </main>
        </div>
    )
}

export default MainLayout;