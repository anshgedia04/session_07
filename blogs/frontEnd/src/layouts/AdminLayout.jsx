import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-indigo-800 text-white flex flex-col`}>
                <div className="p-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">Admin Panel</div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin" onClick={() => setSidebarOpen(false)} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
                        Dashboard
                    </Link>
                    <Link to="/admin/blogs" onClick={() => setSidebarOpen(false)} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
                        All Blogs
                    </Link>
                    <Link to="/admin/blogs/new" onClick={() => setSidebarOpen(false)} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
                        Add New Blog
                    </Link>
                    <Link to="/admin/categories" onClick={() => setSidebarOpen(false)} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
                        Categories
                    </Link>
                </nav>
                <div className="p-4">
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow p-4 flex items-center">
                    <button onClick={() => setSidebarOpen(true)} className="mr-4 md:hidden text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
