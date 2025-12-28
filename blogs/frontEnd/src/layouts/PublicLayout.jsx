import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicLayout = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
                                B
                            </div>
                            <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                                BlogSpott
                            </span>
                        </Link>

                        <div className="flex items-center gap-6">
                            <Link to="/" className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-indigo-100 hover:text-white'}`}>
                                Home
                            </Link>
                            <Link to="/login" className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${scrolled ? 'bg-gray-900 text-white hover:bg-indigo-600' : 'bg-white text-indigo-900 hover:bg-indigo-50'}`}>
                                Admin Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-sm">
                                    B
                                </div>
                                <span className="text-lg font-bold text-gray-900">BlogSpott</span>
                            </div>
                            <p className="text-gray-500 text-sm text-center md:text-left max-w-xs">
                                Sharing stories, ideas, and expertise with the world. Built for modern readers.
                            </p>
                        </div>
                        <div className="flex gap-8 text-sm text-gray-500">
                            <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} BlogSpott. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
