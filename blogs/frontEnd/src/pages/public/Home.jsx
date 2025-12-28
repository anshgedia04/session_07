import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('');
    const [featuredBlog, setFeaturedBlog] = useState(null);

    const fetchBlogs = async (query = '') => {
        try {
            const endpoint = query ? `/blogs/search?q=${query}` : '/blogs';
            const res = await api.get(endpoint);
            const data = res.data.data;
            setBlogs(data);
            if (data.length > 0 && !query) {
                setFeaturedBlog(data.find(b => b.featured) || data[0]);
            }
        } catch (error) {
            console.error("Failed to fetch blogs", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBlogs(search);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900 text-white relative overflow-hidden -mt-20 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-indigo-100 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                        🚀 Welcome to the Future of Blogging
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        Discover Stories <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                            That Matter
                        </span>
                    </h1>
                    <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto font-light">
                        Insights, tutorials, and perspectives from our expert writers on technology, lifestyle, and innovation.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-white rounded-xl p-2 shadow-2xl">
                            <span className="pl-4 text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search for articles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-4 text-gray-900 placeholder-gray-400 focus:outline-none rounded-xl"
                            />
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Latest Blogs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                        Latest Articles
                    </h2>
                    {/* <div className="flex gap-2">
                        <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                        <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
                    </div> */}
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="inline-block p-4 rounded-full bg-indigo-50 text-indigo-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
                        <p className="text-gray-500">Try searching for something else or come back later.</p>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {blogs.map((blog, index) => (
                            <Link to={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                                <div className="relative overflow-hidden h-64">
                                    {blog.thumbnail ? (
                                        <img
                                            src={`http://localhost:5000${blog.thumbnail}`}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-indigo-700 uppercase tracking-wider rounded-lg shadow-sm">
                                            {blog.category?.name || 'General'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center text-xs text-gray-500 mb-4 gap-2">
                                        <span>{new Date(blog.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>5 min read</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                                        {blog.title}
                                    </h3>

                                    <div className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 opacity-90" dangerouslySetInnerHTML={{ __html: blog.description }}></div>

                                    <div className="flex items-center pt-4 border-t border-gray-50 mt-auto">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                            A
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-xs font-semibold text-gray-900">Admin Author</p>
                                        </div>
                                        <span className="ml-auto text-indigo-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                            Read <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
